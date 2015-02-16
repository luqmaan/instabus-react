var React = window.React = require('react');
var Leaflet = window.Leaflet = require('react-leaflet');
var {Map, Marker, Popup, TileLayer, Polyline, CircleMarker} = Leaflet;

var position = [30.267153, -97.743061];


var RoutesList = React.createClass({

    render() {
        var routes = this.props.routes.map((route) => {
            return (
                <li key={route.route_id} onClick={this.props.onRouteSelected.bind(null, route.route_id)}>
                    <span>{route.route_id}</span>
                    <span>{route.name}</span>
                </li>
            );
        }, this);

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
                    key={'polyline:' + this.props.routeId + ':' + index} />
            );
        }, this);

        var stopsList = this.props.stops.map((stop, index) => {
            return (
                <CircleMarker
                    center={{lat: stop.stop_lat, lng: stop.stop_lon}}
                    key={'stop:' + this.props.routeId + ':' + stop.direction_id + ':' + stop.stop_id}>
                    <Popup>
                        <span>{stop.stop_name}</span>
                    </Popup>
                </CircleMarker>
            );
        }, this);


        var vehiclesList = this.props.vehicles.map((vehicle, index) => {
            return (
                <CircleMarker
                    center={vehicle}
                    key={'vehicle:' + vehicle.vId + ':' + index}
                    className='vehicle-marker'>
                    <Popup>
                        <span>{vehicle.Routeid}</span>
                    </Popup>
                </CircleMarker>
            );
        });

        return (
            <Map center={position} zoom={13} id='map'>
                <TileLayer
                    url='https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
                    attribution='<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>'
                    id='drmaples.ipbindf8' />
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
var staticPolylines = {
    801: [require('../data/shapes_801_0.json'), require('../data/shapes_801_1.json')],
    550: [require('../data/shapes_550_0.json'), require('../data/shapes_550_1.json')],
    803: [require('../data/shapes_803_0.json'), require('../data/shapes_803_1.json')],
};
var staticStops = {
    801: require('../data/stops_801_0.json').concat(require('../data/stops_801_1.json')),
    550: require('../data/stops_550_0.json').concat(require('../data/stops_550_1.json')),
    803: require('../data/stops_803_0.json').concat(require('../data/stops_803_1.json')),
}
// var staticVehicles = require('../data/vehicles_801.json').NextBus2.query.results.Envelope.Body.Nextbus2Response.Runs.Run;
var staticArrivals = require('../data/arrivals.json');

var App = React.createClass({

    getInitialState() {
        return {
            activeRouteId: null,
        };
    },

    handleRouteChange(routeId) {
        console.log(routeId)
        this.setState({
            activeRouteId: routeId
        });
    },

    render() {
        var routeDetails = !this.state.activeRouteId ? null : (
            <div>
                <h1>{this.state.activeRouteId}</h1>
                <Arrivals arrivals={staticArrivals[this.state.activeRouteId]} />
                <MapController
                    id="map-controller"
                    routeId={this.state.activeRouteId}
                    polylines={staticPolylines[this.state.activeRouteId]}
                    vehicles={staticArrivals[this.state.activeRouteId]}
                    stops={staticStops[this.state.activeRouteId]} />
            </div>
        );

        return (
            <div>
                <RoutesList routes={staticRoutes} activeRouteId={this.state.activeRouteId} onRouteSelected={this.handleRouteChange} />
                {routeDetails}
            </div>
        );
    }
});

React.render(<App />, document.getElementById('app'));


module.exports = window.App = App;
