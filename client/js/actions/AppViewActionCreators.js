var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


module.exports = {
    showRoute(routeId) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.ROUTE_SHOW,
            routeId: routeId,
        });
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
            type: AppConstants.ActionTypes.ROUTE_SHOW_MULTIPLE,
            routeIds: routeIds,
        });
    },

    hideAllRoutes(routeIds) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.ROUTE_HIDE_ALL,
            routeIds: routeIds,
        });
    },

    hashChange(hash) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.HASH_CHANGE,
            hash: hash,
        });
    }
};
