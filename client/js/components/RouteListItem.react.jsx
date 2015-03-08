var React = require('react');
var AppViewActionCreators = require('../actions/AppViewActionCreators');


var RouteSection = React.createClass({

    propTypes: {
        route: React.PropTypes.object.isRequired,
    },

    render() {
        return (
            <li>
                <button className="route" onClick={this._onClick}>
                    {this.props.route.routeId} {this.props.route.name}
                </button>
                <button className="checkbox" onClick={this._onCheck}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </button>
            </li>
        );
    },

    _onClick() {
        AppViewActionCreators.showRoute(this.props.route.routeId);
    },

    _onCheck() {
        console.log('ON Check')
    }

});

module.exports = RouteSection;
