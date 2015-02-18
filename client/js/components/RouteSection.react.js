var React = require('React');

var RouteSection = React.createClass({

    render() {
        var routes = this.props.routes.map((route) => {
            return (
                <li key={route.route_id} onClick={this.props.onRouteSelected.bind(null, route.route_id)}>
                    <span>{route.route_id}</span>
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
