var React = require('react');

var AppViewActionCreators = require('../actions/AppViewActionCreators');
var RouteStore = require('../stores/RouteStore');
var RouteListItem = require('./RouteListItem.react.jsx');


function getRouteListItems(routes) {
    var routeIds = Object.keys(routes).map(Number);

    return routeIds.map((routeId) => {
        var route = routes[routeId];
        var checked = RouteStore.isChecked(routeId);

        return (
            <RouteListItem
                checked={checked}
                route={route}
                key={'routelistitem:' + routeId} />
        );
    });
}

var RouteSection = React.createClass({

    propTypes: {
        routes: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
    },

    checkRoutes() {
        var routeIds = Object.keys(this.props.routes).map(Number);

        var containsUncheckedRoutes = routeIds.map((routeId) => {
            return RouteStore.isChecked(routeId);
        });

        if (containsUncheckedRoutes.indexOf(false) !==-1) {
            AppViewActionCreators.checkRoute(routeIds);
        }
        else {
            AppViewActionCreators.uncheckRoute(routeIds);
        }
    },

    render() {
        var routeListItems = getRouteListItems(this.props.routes);

        return (
            <div className='content'>
                <div className='list-header-view'>
                    <h3>All Routes</h3>
                    <button onClick={this.checkRoutes}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M0 0h24v24h-24z" fill="none"/>
                            <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41 6.34-6.34zm4.24-1.41l-10.58 10.58-4.18-4.17-1.41 1.41 5.59 5.59 12-12-1.42-1.41zm-21.83 7.82l5.59 5.59 1.41-1.41-5.58-5.59-1.42 1.41z"/>
                        </svg>
                    </button>
                </div>
                <div className='list-view'>
                    <ul>{routeListItems}</ul>
                </div>
            </div>
        );
    }

});

module.exports = RouteSection;
