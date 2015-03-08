var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var GTFSUtils = require('../utils/GTFSUtils');

var CHANGE_EVENT = 'change';

var _routes = {};
var _currentRouteIds = new Set();


function _addRoutes(rawRoutes) {
    rawRoutes.forEach(function(rawRoute) {
        var route = GTFSUtils.convertRawRoute(rawRoute);
        _routes[route.routeId] = route;
    });
}

function _addCurrentRoute(routeId) {
    _currentRouteIds.add(routeId);
}

function _removeCurrentRoute(routeId) {
    _currentRouteIds.delete(routeId);
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

    getCurrentRouteIds() {
        var ids = [];
        _currentRouteIds.forEach((id) => ids.push(id));
        return ids;
    },

    getCurrent() {
        var currentRoutes = [];

        _currentRouteIds.forEach((routeId) => {
            currentRoutes.push(_routes[routeId]);
        });

        return currentRoutes;
    },

    getAll() {
        return _routes;
    },

    isCurrent(routeId) {
        return _currentRouteIds.has(routeId);
    },
});


RouteStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case AppConstants.ActionTypes.RECEIVE_RAW_ROUTES:
            _addRoutes(action.rawRoutes);
            RouteStore.emitChange();
            break;

        case AppConstants.ActionTypes.ROUTE_SHOW:
            _addCurrentRoute(action.routeId);
            RouteStore.emitChange();
            break;

        case AppConstants.ActionTypes.ROUTE_HIDE:
            _removeCurrentRoute(action.routeId);
            RouteStore.emitChange();
            break;

        default:
            // po op
    }

});

module.exports = RouteStore;
