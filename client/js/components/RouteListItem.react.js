var React = require('React');
var AppViewActionCreators = require('../actions/AppViewActionCreators');


var RouteSection = React.createClass({

    propTypes: {
        route: React.PropTypes.object.isRequired,
        visible: React.PropTypes.bool.isRequired,
    },

    render() {
        return (
            <li onClick={this._onClick}>
                {this.props.visible ? 'Hide' : 'Show'} {this.props.route.routeId} {this.props.route.name}
            </li>
        );
    },

    _onClick() {
        if (this.props.visible)
            AppViewActionCreators.hideRoute(this.props.route.routeId);
        else
            AppViewActionCreators.showRoute(this.props.route.routeId);
    }

});

module.exports = RouteSection;
