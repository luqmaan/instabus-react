var React = require('React');


var RouteSection = React.createClass({

    propTypes: {
        routes: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
    },

    render() {
        var routeIds = Object.keys(this.props.routes);
        var routes = routeIds.map((routeId) => {
            var route = this.props.routes[routeId];
            return (
                <li key={routeId} onClick={this.props.onRouteSelected.bind(null, routeId)}>
                    <span>{routeId}</span>
                    <span>{route.name}</span>
                </li>
            );
        }, this);

        return (
            <ul>
                {routes}
            </ul>
        );
    }

});

module.exports = RouteSection;
