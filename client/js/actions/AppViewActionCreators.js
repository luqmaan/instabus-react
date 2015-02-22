var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var GTFSWebAPIUtils = require('../utils/GTFSWebAPIUtils');


module.exports = {
    clickRoute(routeId) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.CLICK_ROUTE,
            routeId: routeId
        });

        GTFSWebAPIUtils.getStopsForRoute(routeId);
    }
};
