var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var GTFSWebAPIUtils = require('../utils/GTFSWebAPIUtils');


module.exports = {
    showRoute(routeId) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.ROUTE_SHOW,
            routeId: routeId,
        });

        GTFSWebAPIUtils.getStopsForRoute(routeId);
        GTFSWebAPIUtils.getPolylinesForRoute(routeId);
    },

    hideRoute(routeId) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.ROUTE_HIDE,
            routeId: routeId,
        });
    },

    checkRoute(routeId) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.ROUTE_CHECK,
            routeId: routeId,
        });
    },

    uncheckRoute(routeId) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.ROUTE_UNCHECK,
            routeId: routeId,
        });
    },

    showMultipleRoutes(routeIds) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.ROUTE_RESET_CHECKED,
        });

        routeIds.forEach(this.showRoute);
    }
};
