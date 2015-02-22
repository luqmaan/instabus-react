var React = require('React');

var RouteStore = require('../stores/RouteStore');
var StopStore = require('../stores/StopStore');
var PolylineStore = require('../stores/PolylineStore');
var VehicleStore = require('../stores/VehicleStore');
var RouteSection = require('./RouteSection.react');
var ArrivalSection = require('./ArrivalSection.react');
var MapSection = require('./MapSection.react');


function getStateFromStores() {
    return {
        currentRoutes: RouteStore.getCurrent(),
        routes: RouteStore.getAll(),
        stops: StopStore.getCurrent(),
        polylines: PolylineStore.getCurrent(),
        vehicles: VehicleStore.getCurrent(),
        arrivals: [],
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
        PolylineStore.addChangeListener(this._onChange);
        VehicleStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        RouteStore.removeChangeListener(this._onChange);
        StopStore.removeChangeListener(this._onChange);
        PolylineStore.removeChangeListener(this._onChange);
        VehicleStore.removeChangeListener(this._onChange);
    },

    render() {
        return (
            <div>
                <h3>All Routes</h3>
                <RouteSection
                    routes={this.state.routes}
                    currentRoutes={this.state.currentRoutes} />
                <MapSection
                    id="map-controller"
                    initialPosition={[30.267153, -97.743061]}
                    routes={this.state.currentRoutes}
                    stops={this.state.stops}
                    poylines={this.state.polylines}
                    vehicles={this.state.vehicles} />
            </div>
        );
    }
});

module.exports = App;
