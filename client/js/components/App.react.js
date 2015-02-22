var React = require('React');
var RouteSection = require('./RouteSection.react');
var ArrivalSection = require('./ArrivalSection.react');
var MapSection = require('./MapSection.react');

var staticPolylines = {
    801: [require('../../data/shapes_801_0.json'), require('../../data/shapes_801_1.json')],
    550: [require('../../data/shapes_550_0.json'), require('../../data/shapes_550_1.json')],
    803: [require('../../data/shapes_803_0.json'), require('../../data/shapes_803_1.json')],
};
var staticStops = {
    801: require('../../data/stops_801_0.json').concat(require('../../data/stops_801_1.json')),
    550: require('../../data/stops_550_0.json').concat(require('../../data/stops_550_1.json')),
    803: require('../../data/stops_803_0.json').concat(require('../../data/stops_803_1.json')),
};
var staticArrivals = require('../../data/arrivals.json');

var App = React.createClass({

    getInitialState() {
        return {
            routes: [],
            visibleRoutes: [],
            polylines: [],
            vehicles: [],
            arrivals: [],
            stops: [],
        };
    },

    handleRouteChange(routeId) {
        console.log(routeId);
    },

    render() {
        var routeDetails = !this.state.visibleRoutes.length ? null : (
            <div>
                <h1>{this.state.visibleRoutes}</h1>
                <ArrivalSection arrivals={this.state.arrivals} />
                <MapSection
                    id="map-controller"
                    initialPosition={[30.267153, -97.743061]}
                    polylines={this.state.polylines}
                    vehicles={this.state.vehicles}
                    stops={this.state.stops} />
            </div>
        );

        return (
            <div>
                <RouteSection routes={this.props.routes} visibleRoutes={this.state.visibleRoutes} onRouteSelected={this.handleRouteChange} />
                {routeDetails}
            </div>
        );
    }
});

module.exports = App;
