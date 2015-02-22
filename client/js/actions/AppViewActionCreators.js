var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


module.exports = {
    clickRoute(routeId) {
        AppDispatcher.handleViewAction({
            type: AppConstants.ActionTypes.CLICK_ROUTE,
            routeId: routeId
        });
    }
};
