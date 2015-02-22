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

    render() {

        var visibleRoutesSection = this.state.currentRoutes.map((route) => {
            return (
                <div key={'visiblerouteheader:' + route.route_id}>{route.name}</div>
            );
        })

        return (
            <div>
                <h3>All Routes</h3>
                <RouteSection routes={this.state.routes} currentRoutes={this.state.currentRoutes} />
                <div>
                    <h3>Visible Routes</h3>
                    {visibleRoutesSection}
                </div>
            </div>
        );
    }
});

module.exports = App;
