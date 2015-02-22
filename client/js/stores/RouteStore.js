var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var CHANGE_EVENT = 'change';

var _routes = {};
var _currentRouteIds = new Set([]);


function _addRoutes(rawRoutes) {
    rawRoutes.forEach(function(routeData) {
        _routes[routeData.route_id] = routeData;
    });
}

function _addCurrentRoute(routeId) {
    _currentRouteIds.add(routeId);
}


var RouteStore = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get(id) {
        return _routes[id];
    },

    getCurrent() {
        var currentRoutes = [];
        for (var routeId of _currentRouteIds) {
            currentRoutes.push(this.get(routeId));
        }
        return currentRoutes;
    },

    getAll() {
        return _routes;
    },
});


RouteStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case AppConstants.ActionTypes.RECEIVE_RAW_ROUTES:
            _addRoutes(action.rawRoutes);
            RouteStore.emitChange();
            break;

        case AppConstants.ActionTypes.CLICK_ROUTE:
            _addCurrentRoute(action.routeId);
            RouteStore.emitChange();
            break;

        default:
            // po op
    }

});

module.exports = RouteStore;
