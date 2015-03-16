var React = require('react');

var AppViewActionCreators = require('../actions/AppViewActionCreators');


var AppRouter = React.createClass({

    propTypes: {
        currentRouteIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    },

    getInitialState() {
        return {
            hash: null,
        };
    },

    componentWillMount() {
        this.onHashChange();
        window.addEventListener('hashchange', this.onHashChange);
    },

    componentDidUnmount() {
        window.removeEventListener('hashchange', this.onHashChange);
    },

    onHashChange() {
        if (location.hash !== `#${this.state.hash}`) {
            console.log('location.hash does not match AppRouter.state.hash', location.hash, this.state.hash);

            if (location.hash.match(/route\/([\w\d]\+*)+\/$/g)) {
                var routeIds = location.hash.replace('#/route/', '').match(/\d+/g).map(Number);
                AppViewActionCreators.showMultipleRoutes(routeIds);
            }
            if (location.hash.search(/#\/{0,1}$/g) !== -1){
                AppViewActionCreators.hideAllRoutes();
            }
        }
    },

    render() {
        if (this.props.currentRouteIds.length) {
            var currentRoutes = this.props.currentRouteIds.sort().join('+');
            this.state.hash = `/route/${currentRoutes}/`;
        }
        else if (this.props.currentRouteIds.length === 0) {
            this.state.hash = '/';
        }

        if (this.state.hash !== location.hash) {
            console.debug('Rendering URL', this.state.hash);
            location.hash = this.state.hash;
        }

        return null;
    }
});

module.exports = AppRouter;
