var React = require('React');

var RouteStore = require('../stores/RouteStore');
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
        stops: [],
    };
}


var App = React.createClass({

    getInitialState() {
        return getStateFromStores();
    },

    _onChange() {
        console.log('onchange')
        this.setState(getStateFromStores());
    },

    componentDidMount() {
        RouteStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        RouteStore.removeChangeListener(this._onChange);
    },

    handleRouteChange(routeId) {
        console.log(routeId);
    },

    render() {
        // var routeDetails = !this.state.currentRoutes.length ? null : (
        //     <div>
        //         <h1>{this.state.currentRoutes}</h1>
        //         <ArrivalSection arrivals={this.state.arrivals} />
        //         <MapSection
        //             id="map-controller"
        //             initialPosition={[30.267153, -97.743061]}
        //             polylines={this.state.polylines}
        //             vehicles={this.state.vehicles}
        //             stops={this.state.stops} />
        //     </div>
        // );

        return (
            <div>
                <RouteSection routes={this.state.routes} currentRoutes={this.state.currentRoutes} onRouteSelected={this.handleRouteChange} />
            </div>
        );
    }
});

module.exports = App;
