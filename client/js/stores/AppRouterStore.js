var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var RouteStore = require('../stores/RouteStore');

var CHANGE_EVENT = 'change';

function changeRoute(hash) {
    if (RouteStore.getCurrentIds().length) {
        var currentRoutes = RouteStore.getCurrentIds().sort().join('+');
        location.hash = `/route/${currentRoutes}/`;
    }
}

var AppRouterStore = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

});

AppRouterStore.dispatchToken = AppDispatcher.register((payload) => {
    AppDispatcher.waitFor([
        RouteStore.dispatchToken,
    ]);

    var action = payload.action;

    switch(action.type) {
        case AppConstants.ActionTypes.ROUTE_SHOW:

            break;

        default:
            // po op
    }
});

module.exports = AppRouterStore;
