var React = require('react');
var AppViewActionCreators = require('../actions/AppViewActionCreators');


var RouteSection = React.createClass({

    propTypes: {
        route: React.PropTypes.object.isRequired,
        visible: React.PropTypes.bool.isRequired,
    },

    render() {
        return (
            <li>
                <div onClick={this._onClick}>
                    {this.props.visible ? 'Hide' : 'Show'} {this.props.route.routeId} {this.props.route.name}
                </div>
                <input type="checkbox" onClick={this._onCheck} />
            </li>
        );
    },

    _onClick() {
        if (this.props.visible) {
            AppViewActionCreators.hideRoute(this.props.route.routeId);
        }
        else {
            AppViewActionCreators.showRoute(this.props.route.routeId);
        }
    },

    _onCheck() {
        console.log('ON Check')
    }

});

module.exports = RouteSection;
