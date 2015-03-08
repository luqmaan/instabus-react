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
    }, this);
}

var RouteSection = React.createClass({

    propTypes: {
        routes: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
    },

    render() {
        var routeListItems = getRouteListItems(this.props.routes);

        return (
            <div className='content'>
                <div className='list-header-view'>All Routes</div>
                <div className='list-view'>
                    <ul>{routeListItems}</ul>
                </div>
            </div>
        );
    }

});

module.exports = RouteSection;
