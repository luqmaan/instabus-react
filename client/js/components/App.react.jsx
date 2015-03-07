var React = require('react');

var RouteStore = require('../stores/RouteStore');
var StopStore = require('../stores/StopStore');
var PolylineStore = require('../stores/PolylineStore');
var VehicleStore = require('../stores/VehicleStore');
var RouteSection = require('./RouteSection.react.jsx');
var ArrivalSection = require('./ArrivalSection.react.jsx');
var MapSection = require('./MapSection.react.jsx');
var NavBar = require('./NavBar.react.jsx');

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
        var mapSection;
        var routeSection;

        if (this.state.currentRoutes.length) {
            mapSection = (
                <MapSection
                    id='map-controller'
                    initialPosition={[30.267153, -97.743061]}
                    routes={this.state.currentRoutes}
                    stops={this.state.stops}
                    poylines={this.state.polylines}
                    vehicles={this.state.vehicles} />
            );
        }
        else {
            routeSection = (
                <RouteSection
                    routes={this.state.routes}
                    currentRoutes={this.state.currentRoutes} />
            );

        }
        return (
            <div className='app-wrapper'>
                <NavBar currentRoutes={this.state.currentRoutes} />
                <div className='content'>
                    <h3>All Routes</h3>
                    {routeSection}
                </div>
                {mapSection}
            </div>
        );
    }
});

module.exports = App;
