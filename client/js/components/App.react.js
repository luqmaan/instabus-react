var React = require('React');

var RouteStore = require('../stores/RouteStore');
var StopStore = require('../stores/StopStore');
var RouteSection = require('./RouteSection.react');
var ArrivalSection = require('./ArrivalSection.react');
var MapSection = require('./MapSection.react');


function getStateFromStores() {
    return {
        currentRoutes: RouteStore.getCurrent(),
        routes: RouteStore.getAll(),
        polylines: [],
        vehicles: [],
        arrivals: [],
        stops: StopStore.getCurrent(),
    };
}


var App = React.createClass({

    getInitialState() {
        return getStateFromStores();
    },

    _onChange() {
        this.setState(getStateFromStores());
    },

    componentDidMount() {
        RouteStore.addChangeListener(this._onChange);
        StopStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        RouteStore.removeChangeListener(this._onChange);
        StopStore.removeChangeListener(this._onChange);
    },

    render() {
        return (
            <div>
                <h3>All Routes</h3>
                <RouteSection routes={this.state.routes} currentRoutes={this.state.currentRoutes} />
                <MapSection
                    id="map-controller"
                    initialPosition={[30.267153, -97.743061]}
                    routes={this.state.currentRoutes}
                    stops={this.state.stops} />
            </div>
        );
    }
});

module.exports = App;
