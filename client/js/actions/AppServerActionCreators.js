var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


module.exports = {
    receiveAll(rawRoutes) {
        AppDispatcher.handleServerAction({
            type: AppConstants.ActionTypes.RECEIVE_RAW_ROUTES,
            rawRoutes: rawRoutes,
        });
    }
};
