#!/usr/bin/python
# -*- coding: utf-8 -*-

# This script is used to update the JSON files in the data folder.
# It downloads the GTFS data from CapMetro, converts it to a SQLite database, and performs some queries on it to generate the JSON files.

from __future__ import unicode_literals

import os
import json
import tempfile
import sqlite3
import logging
from collections import defaultdict

import arrow
import requests
import gtfsdb
from gtfsdb.api import database_load

GTFS_DOWNLOAD_FILE = os.path.join('/tmp', 'capmetro_gtfs.zip')
GTFS_DB = os.path.join(tempfile.gettempdir(), 'capmetro_gtfs_data.db')
DATA_DIR = os.path.join(os.path.dirname(__file__), 'gtfs')
DATA_VERSION_FILE = os.path.join(DATA_DIR, 'data_version.txt')


def fetch_gtfs_data():
    logger.info('fetching gtfs data....')
    # for other cities we can use http://www.gtfs-data-exchange.com/agency/capital-metro/latest.zip
    gtfs_url = 'https://data.texas.gov/download/r4v4-vz24/application/zip'
    r = requests.get(gtfs_url, stream=True)
    assert r.ok, 'problem fetching data. status_code={}'.format(r.status_code)

    # looks like 'capital-metro_20140609_0109.zip'
    with open(DATA_VERSION_FILE, 'wb') as f:
        f.write('{}\n{}\n'.format(r.url, arrow.now()))

    with open(GTFS_DOWNLOAD_FILE, 'wb') as f:
        for chunk in r.iter_content(1024):
            f.write(chunk)
    logger.info('saved to {}'.format(GTFS_DOWNLOAD_FILE))


def _get_route_types(curr):
    route_types = {}

    sql = '''
        SELECT route_type, route_type_name
        FROM route_type
    '''
    curr.execute(sql)

    for row in curr:
        route_type = int(row[0])
        route_type_name = row[1]

        route_types[route_type] = route_type_name

    return route_types


def _get_routes_for_types(curr, route_types):
    routes = {}

    sql = '''
        SELECT route_id, route_long_name, route_type
        FROM routes
    '''
    curr.execute(sql)

    for row in curr:
        route_id = int(row[0])
        route_long_name = row[1]
        route_type = int(row[2])
        routes[route_id] = {
            'route_id': route_id,
            'name': route_long_name,
            'route_type': route_types[route_type],
            'directions': [],
        }

    return routes


def _get_directions_for_routes(curr, routes):
    sql = '''
        SELECT DISTINCT route_id, direction_id, trip_headsign
        FROM trips
        ORDER BY route_id DESC, trip_headsign ASC
    '''
    curr.execute(sql)

    for row in curr:
        route_id = int(row[0])
        direction_id = int(row[1])
        headsign = row[2].title()
        direction = {
            'direction_id': direction_id,
            'headsign': headsign,
        }
        routes[route_id]['directions'].append(direction)

    return routes


def _save_route_data(curr):
    route_types = _get_route_types(curr)
    routes = _get_routes_for_types(curr, route_types)
    directions = _get_directions_for_routes(curr, routes)

    data = sorted(directions.values(), key=lambda x: x['route_id'])

    filename = os.path.join(DATA_DIR, 'routes.json')
    logger.info('writing ROUTE data to {}'.format(filename))
    with open(filename, 'wb') as f:
        f.write(json.dumps(data) + '\n')


def _get_largest_shapes(curr):
    sql = '''
        SELECT shape_id, route_id, direction_id, max(num_shapes)
        FROM (
            SELECT trips.route_id, trips.direction_id, shapes.shape_id, count(*) as num_shapes
            FROM
                shapes,
                (
                    SELECT *
                    FROM trips, calendar
                    WHERE calendar.service_id = trips.service_id
                    GROUP BY trips.shape_id
                ) as trips
            WHERE shapes.shape_id = trips.shape_id
            GROUP BY shapes.shape_id
        )
        GROUP BY route_id, direction_id
    '''
    curr.execute(sql)

    shapes = defaultdict(list)

    for (shape_id, route_id, _, _) in curr:
        shapes[route_id].append(shape_id)

    return shapes


def _get_shape(curr, shape_id):
    sql = '''
        SELECT shape_pt_lat, shape_pt_lon
        FROM shapes
        WHERE shape_id = "{shape_id}"
        ORDER BY shape_id
    '''.format(shape_id=shape_id)
    curr.execute(sql)

    positions = []
    for (shape_pt_lat, shape_pt_lon) in curr:
        positions.append([shape_pt_lat, shape_pt_lon])
    return {
        'shape_id': shape_id,
        'positions': positions,
    }


def _save_shape_data(curr):
    '''
        Choose the two largest shapes for both directions of a route.
        This assumes that the shape with the most points will include all the other potential shapes, but it might not.
        Although assuming could lead to problems, it makes the Yavascript easier.
    '''

    largest_shapes = _get_largest_shapes(curr)

    for route_id, shape_ids in largest_shapes.items():
        shapes = []
        for shape_id in shape_ids:
            shapes.append(_get_shape(curr, shape_id))

        data = {
            'route_id': route_id,
            'shapes': shapes,
        }

        filename = os.path.join(DATA_DIR, 'shapes_{}.json'.format(route_id))
        # logger.info('writing SHAPE data to {}'.format(filename))
        with open(filename, 'wb') as f:
            f.write(json.dumps(data) + '\n')


def _save_stop_data(curr):
    sql = '''
        SELECT
            trips.route_id,
            stops.stop_id,
            stops.stop_name,
            stops.stop_desc,
            stops.stop_lat,
            stops.stop_lon,
            stops.stop_url
        FROM
            stop_times, trips, stops
        WHERE trips.trip_id = stop_times.trip_id
            AND stop_times.stop_id = stops.stop_id
        GROUP BY
            trips.route_id,
            stops.stop_id
    '''
    curr.execute(sql)

    data_by_stops = defaultdict(list)
    for (route_id, stop_id, stop_name, stop_desc, stop_lat, stop_lon, stop_url) in curr:
        data_by_stops[route_id].append({
            'route_id': route_id,
            'stop_id': stop_id,
            'stop_name': stop_name,
            'stop_desc': stop_desc,
            'stop_lat': stop_lat,
            'stop_lon': stop_lon,
            'stop_url': stop_url,
        })

    for route_id, data in data_by_stops.items():
        filename = os.path.join(DATA_DIR, 'stops_{}.json'.format(route_id))
        logger.info('writing STOP data to {}'.format(filename))
        with open(filename, 'wb') as f:
            f.write(json.dumps(data) + '\n')


def parse_gtfs_data():
    logger.info('loading gtfs data into db ({})...'.format(GTFS_DB))
    database_load(
        filename=GTFS_DOWNLOAD_FILE,
        batch_size=gtfsdb.config.DEFAULT_BATCH_SIZE,
        schema=gtfsdb.config.DEFAULT_SCHEMA,
        is_geospatial=gtfsdb.config.DEFAULT_IS_GEOSPATIAL,
        tables=None,
        url='sqlite:///{}'.format(GTFS_DB),
    )

    with sqlite3.connect(GTFS_DB) as conn:
        curr = conn.cursor()
        _save_route_data(curr)
        _save_shape_data(curr)
        _save_stop_data(curr)


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, format='%(asctime)-15s [%(levelname)s] %(message)s')
    logger = logging.getLogger(__name__)

    # Manually download the GTFS file from socrata https://data.texas.gov/Transportation/Capital-Metro-Google-Transit/8s4f-jd2a
    # And copy pasta it to /tmp/capmetro_gtfs.zip
    # The file is still behind a socrata login wall during the beta
    # fetch_gtfs_data()

    parse_gtfs_data()
