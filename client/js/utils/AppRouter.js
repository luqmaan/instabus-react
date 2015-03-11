var AppViewActionCreators = require('../actions/AppViewActionCreators');
var RouteStore = require('../stores/RouteStore');


var AppRouter = {
    init() {
        
        this.hashChange();
    },
    hashChange() {
        // /route/801+803+D+XYZ/
        if (location.hash.match(/route\/([\w\d]\+*)+\/$/g)) {
            var routeIds = location.hash.replace('#/route/', '').match(/\d+/g).map(Number);
            AppViewActionCreators.showMultipleRoutes(routeIds);
        }
    },
    changeRoute(hash) {
        if (RouteStore.getCurrentIds().length) {
            var currentRoutes = RouteStore.getCurrentIds().sort().join('+');
            location.hash = `/route/${currentRoutes}/`;
        }
    }
};


module.exports = AppRouter;
