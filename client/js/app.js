var React = window.React = require('react');
var Leaflet = window.Leaflet = require('react-leaflet');
var {Map, Marker, Popup, TileLayer, Polyline, CircleMarker} = Leaflet;

var position = [30.267153, -97.743061];


var polylinesFetcher = window.polylinesFetcher = {
    '801': [
        require('../data/shapes_801_0.json'),
        require('../data/shapes_801_1.json'),
    ]
};
var stopsFetcher = window.stopsFetcher = {
    '801': require('../data/stops_801_0.json').concat(require('../data/stops_801_1.json')),
};
var vehiclesFetcher = window.vehiclesFetcher = {
    '801': require('../data/vehicles_801.json'),
};


var MapController = React.createClass({

    getPolylines() {
        return polylinesFetcher[this.props.routeId];
    },

    getStops() {
        return stopsFetcher[this.props.routeId];
    },

    getVehicles() {
        return vehiclesFetcher[this.props.routeId].NextBus2.query.results.Envelope.Body.Nextbus2Response.Runs.Run;
    },

    render() {
        var polylines = this.getPolylines().map((positions, index) => {
            return (
                <Polyline
                    positions={positions}
                    key={this.props.routeId + "_" + index}
                />
            );
        }, this);

        var stops = this.getStops().map((stop, index) => {
            return (
                <CircleMarker
                    center={{lat: stop.stop_lat, lng: stop.stop_lon}}
                    key={this.props.routeId + "_" + stop.direction_id + "_" + stop.stop_id}
                >
                    <Popup>
                        <span>{stop.stop_name}</span>
                    </Popup>
                </CircleMarker>
            );
        }, this);

        var vehicles = this.getVehicles().map((vehicle, index) => {
            return (
                <CircleMarker
                    center={{lat: vehicle.Realtime.Lat, lng: vehicle.Realtime.Long}}
                    key={vehicle.Vehicleid}
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
            <Map center={position} zoom={Number(this.props.zoom)} id='map'>
                <TileLayer
                    url='https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
                    attribution='<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>'
                    id='drmaples.ipbindf8'
                />
                {polylines}
                {stops}
                {vehicles}
            </Map>
        );
    },

});

React.render(<MapController routeId="801" zoom="13" />, document.getElementById('map-container'));


window.MapController = MapController

// module.exports = window.App = App;
