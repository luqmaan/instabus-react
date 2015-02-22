var assign = require('object-assign');
var Dispatcher = require('flux').Dispatcher;

var AppConstants = require('../constants/AppConstants');


var AppDispatcher = assign(new Dispatcher(), {

    handleServerAction(action) {
        var payload = {
            source: AppConstants.PayloadSources.SERVER_ACTION,
            action: action,
        };
        console.log('server dispatch', action);
        this.dispatch(payload);
    },

    handleViewAction(action)  {
        var payload = {
            source: AppConstants.PayloadSources.VIEW_ACTION,
            action: action,
        };
        console.log('view dispatch', action);
        this.dispatch(payload);
    }

});

module.exports = AppDispatcher;
