var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var GTFSWebAPIUtils = require('../utils/GTFSWebAPIUtils');


module.exports = {
    showRoute(routeId) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.ROUTE_SHOW,
            routeId: routeId
        });

        GTFSWebAPIUtils.getStopsForRoute(routeId);
    },

    hideRoute(routeId) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.ROUTE_HIDE,
            routeId: routeId
        });
    }
};
