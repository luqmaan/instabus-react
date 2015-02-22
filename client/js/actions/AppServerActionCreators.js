var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


module.exports = {
    receiveRoutes(rawRoutes) {
        AppDispatcher.handleServerAction({
            type: AppConstants.ActionTypes.RECEIVE_RAW_ROUTES,
            rawRoutes: rawRoutes,
        });
    },

    receiveStops(routeId, rawStops) {
        AppDispatcher.handleServerAction({
            type: AppConstants.ActionTypes.RECEIVE_RAW_STOPS,
            routeId: routeId,
            rawStops: rawStops,
        });
    }
};
