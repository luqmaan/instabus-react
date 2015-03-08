var React = require('react');

var AppViewActionCreators = require('../actions/AppViewActionCreators');
var RouteStore = require('../stores/RouteStore');
var RouteListItem = require('./RouteListItem.react.jsx');


var RouteSection = React.createClass({

    propTypes: {
        routes: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
    },

    render() {
        var routeIds = Object.keys(this.props.routes).map(Number);

        var routeListItems = routeIds.map((routeId) => {
            var route = this.props.routes[routeId];

            return (
                <RouteListItem route={route} key={'routelistitem:' + routeId} />
            );
        }, this);

        return (
            <ul>{routeListItems}</ul>
        );
    }

});

module.exports = RouteSection;
