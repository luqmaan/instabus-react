var React = require('react');

var AppConstants = require('../constants/AppConstants');
var RouteStore = require('../stores/RouteStore');
var StopStore = require('../stores/StopStore');
var PolylineStore = require('../stores/PolylineStore');
var VehicleStore = require('../stores/VehicleStore');
var RouteSection = require('./RouteSection.react.jsx');
var ArrivalSection = require('./ArrivalSection.react.jsx');
var MapSection = require('./MapSection.react.jsx');
var NavBar = require('./NavBar.react.jsx');
var AppRouter = require('./AppRouter.react.jsx');

function getStateFromStores() {
    return {
        currentRoutes: RouteStore.getCurrent(),
        currentRouteIds: RouteStore.getCurrentIds(),
        checkedRoutes: RouteStore.getChecked(),
        checkedRouteIds: RouteStore.getCheckedIds(),
        routes: RouteStore.getAll(),
        stops: StopStore.getCurrent(),
        polylines: PolylineStore.getCurrent(),
        vehicles: VehicleStore.getCurrent(),
        fleetUpdateTime: VehicleStore.getFleetUpdateTime(),
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

        console.log('render');

        if (this.state.currentRoutes.length) {
            mapSection = (
                <MapSection
                    initialPosition={AppConstants.Map.INITIAL_POSITION}
                    fleetUpdateTime={this.state.fleetUpdateTime}
                    routes={this.state.currentRoutes}
                    stops={this.state.stops}
                    polylines={this.state.polylines}
                    vehicles={this.state.vehicles} />
            );
        }
        else {
            routeSection = (
                <div className='content-wrapper'>
                    <div className='content'>
                        <p>Tweet @luqmonster if you have any ideas or problems.</p>
                        <p>Or fork <a href='https://github.com/luqmaan/instabus-react'>github.com/luqmaan/instabus-react</a>.</p>
                    </div>
                    <RouteSection
                        routes={this.state.routes}
                        checkedRouteIds={this.state.checkedRouteIds} />
                </div>
            );

        }

        return (
            <div className='app-wrapper'>
                <AppRouter currentRouteIds={this.state.currentRouteIds}/>
                <NavBar
                    currentRoutes={this.state.currentRoutes}
                    checkedRouteIds={this.state.checkedRouteIds} />
                {routeSection}
                {mapSection}
            </div>
        );
    }
});

module.exports = App;
