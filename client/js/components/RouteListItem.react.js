var React = require('React');
var AppViewActionCreators = require('../actions/AppViewActionCreators');


var RouteSection = React.createClass({

    propTypes: {
        route: React.PropTypes.object.isRequired,
    },

    render() {
        return (
            <li onClick={this._onClick}>
                <span>{this.props.route.route_id}</span>
                <span>{this.props.route.name}</span>
            </li>
        );
    },

    _onClick() {
        AppViewActionCreators.clickRoute(this.props.route.route_id);
    }

});

module.exports = RouteSection;
