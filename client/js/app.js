var React = window.React = require('react');
var Leaflet = window.Leaflet = require('react-leaflet');
var {Map, Marker, Popup, TileLayer, Polyline, CircleMarker} = Leaflet;

var position = [30.267153, -97.743061];


var RoutesList = React.createClass({

    render() {
        var routes = this.props.routes.map((route) => {
            return (
                <li key={route.route_id}>
                    <span>{route.route_id}</span>
                    <span>{route.name}</span>
                </li>
            );
        })

        return (
            <ul>
                {routes}
            </ul>
        );
    }

});


var MapController = React.createClass({

    render() {
        var polylinesList = this.props.polylines.map((positions, index) => {
            return (
                <Polyline
                    positions={positions}
                    key={'polyline:' + this.props.routeId + '_' + index}
                />
            );
        }, this);

        var stopsList = this.props.stops.map((stop, index) => {
            return (
                <CircleMarker
                    center={{lat: stop.stop_lat, lng: stop.stop_lon}}
                    key={'stop:' + this.props.routeId + '_' + stop.direction_id + '_' + stop.stop_id}
                >
                    <Popup>
                        <span>{stop.stop_name}</span>
                    </Popup>
                </CircleMarker>
            );
        }, this);


        var vehiclesList = this.props.vehicles.map((vehicle, index) => {
            var center = {lat: Number(vehicle.Realtime.Lat), lng: Number(vehicle.Realtime.Long)};

            return (
                <CircleMarker
                    center={center}
                    key={'vehicle:' + vehicle.Vehicleid + index}
                    className='vehicle-marker'
                >
                    <Popup>
                        <div>{vehicle.Vehicleid}</div>
                        <div>{vehicle.Realtime.Polltime}</div>
                    </Popup>
                </CircleMarker>
            );
        });

        return (
            <Map center={position} zoom={13} id='map'>
                <TileLayer
                    url='https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
                    attribution='<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>'
                    id='drmaples.ipbindf8'
                />
                {polylinesList}
                {stopsList}
                {vehiclesList}
            </Map>
        );
    },

});

var Arrivals = React.createClass({

    render() {
        var arrivals = this.props.arrivals.map((arrival) => {
            return (
                <li key={'arrival:' + arrival.vId}>{arrival.est}</li>
            );
        });
        return (
            <ul>
                {arrivals}
            </ul>
        );
    }
});

var staticRoutes = require('../data/routes.json');
var staticPolylines = [require('../data/shapes_801_0.json'), require('../data/shapes_801_1.json')];
var staticStops = require('../data/stops_801_0.json').concat(require('../data/stops_801_1.json'));
var staticVehicles = require('../data/vehicles_801.json').NextBus2.query.results.Envelope.Body.Nextbus2Response.Runs.Run;
var staticArrivals = require('../data/arrivals.json').list;

var App = React.createClass({
    render() {
        return (
            <div>
                <RoutesList routes={staticRoutes} />
                <Arrivals arrivals={staticArrivals} />
                <MapController routeId='801' polylines={staticPolylines} vehicles={staticVehicles} stops={staticStops} />
            </div>
        );
    }
});

React.render(<App />, document.getElementById('app'));


module.exports = window.App = App;
