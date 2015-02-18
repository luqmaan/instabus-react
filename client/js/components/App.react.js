var React = require('React');
var RouteSection = require('./RouteSection.react');
var ArrivalSection = require('./ArrivalSection.react');
var MapSection = require('./MapSection.react');

var staticRoutes = require('../../data/routes.json');
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
            activeRouteId: null,
        };
    },

    handleRouteChange(routeId) {
        console.log(routeId);
        this.setState({
            activeRouteId: routeId
        });
    },

    render() {
        var routeDetails = !this.state.activeRouteId ? null : (
            <div>
                <h1>{this.state.activeRouteId}</h1>
                <ArrivalSection arrivals={staticArrivals[this.state.activeRouteId]} />
                <MapSection
                    id="map-controller"
                    initialPosition={[30.267153, -97.743061]}
                    routeId={this.state.activeRouteId}
                    polylines={staticPolylines[this.state.activeRouteId]}
                    vehicles={staticArrivals[this.state.activeRouteId]}
                    stops={staticStops[this.state.activeRouteId]} />
            </div>
        );

        return (
            <div>
                <RouteSection routes={staticRoutes} activeRouteId={this.state.activeRouteId} onRouteSelected={this.handleRouteChange} />
                {routeDetails}
            </div>
        );
    }
});

module.exports = App;
