var React = require('React');

var AppViewActionCreators = require('../actions/AppViewActionCreators');
var RouteListItem = require('./RouteListItem.react');


var RouteSection = React.createClass({

    propTypes: {
        routes: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
    },

    render() {
        var routeIds = Object.keys(this.props.routes);

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
