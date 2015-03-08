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
        console.log('lol', this.state.currentRoutes, this.state.currentRoutes.length)

        if (this.state.currentRoutes.length) {
            mapSection = (
                <MapSection
                    id='map-wrapper'
                    initialPosition={[30.267153, -97.743061]}
                    routes={this.state.currentRoutes}
                    stops={this.state.stops}
                    poylines={this.state.polylines}
                    vehicles={this.state.vehicles} />
            );
        }
        else {
            console.log('showing all routes')
            routeSection = (
                <div className='content'>
                    <RouteSection routes={this.state.routes} />
                </div>
            );

        }
        return (
            <div className='app-wrapper'>
                <NavBar currentRoutes={this.state.currentRoutes} />
                    {routeSection}
                {mapSection}
            </div>
        );
    }
});

module.exports = App;
