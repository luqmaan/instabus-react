var assign = require('object-assign');
var Dispatcher = require('flux').Dispatcher;

var AppConstants = require('../constants/AppConstants');


var AppDispatcher = assign(new Dispatcher(), {

    handleServerAction(action) {
        console.debug('server dispatch', action);
        var payload = {
            source: AppConstants.PayloadSources.SERVER_ACTION,
            action: action,
        };
        this.dispatch(payload);
    },

    handleViewAction(action)  {
        console.debug('view dispatch', action);
        var payload = {
            source: AppConstants.PayloadSources.VIEW_ACTION,
            action: action,
        };
        this.dispatch(payload);
    }

});

module.exports = AppDispatcher;
