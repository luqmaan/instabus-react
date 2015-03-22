var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var GTFSUtils = require('../utils/GTFSUtils');
var GTFSWebAPIUtils = require('../utils/GTFSWebAPIUtils');

var CHANGE_EVENT = 'change';

var _routes = {};
var _currentRouteIds = new Set();
var _checkedRouteIds = new Set();


function _addRoutes(rawRoutes) {
    rawRoutes.forEach(function(rawRoute) {
        var route = GTFSUtils.convertRawRoute(rawRoute);
        _routes[route.routeId] = route;
    });
}

function _addCurrentRoute(routeId) {
    _currentRouteIds.add(routeId);

    GTFSWebAPIUtils.getStopsForRoute(routeId);
    GTFSWebAPIUtils.getPolylinesForRoute(routeId);
}

function _setMultipleRoutes(routeIds) {
    _currentRouteIds.clear();

    routeIds.forEach((routeId) => {
        _currentRouteIds.add(routeId);
    });

    if (routeIds.length <= 3) {
        routeIds.forEach(GTFSWebAPIUtils.getStopsForRoute);
    }
    else {
        console.debug('Not showing stops for ${routeIds.length} routes');
    }

    routeIds.forEach(GTFSWebAPIUtils.getPolylinesForRoute);
}

function _removeCurrentRoute(routeId) {
    _currentRouteIds.delete(routeId);
}

function _clearCurrentRoutes(routeId) {
    _currentRouteIds.clear();
}

function _addCheckedRoute(routeId) {
    if (!Array.isArray(routeId)) {
        routeId = [routeId];
    }
    routeId.forEach((id) => {
        _checkedRouteIds.add(id);
    });
}

function _removeCheckedRoute(routeId) {
    if (!Array.isArray(routeId)) {
        routeId = [routeId];
    }
    routeId.forEach((id) => {
        _checkedRouteIds.delete(id);
    });
}

function _clearCheckedRoutes() {
    _checkedRouteIds.clear();
}

function _currentRoutesFromCheckedRoutes() {
    _currentRouteIds.clear();
    _checkedRouteIds.forEach((routeId) => {
        _currentRouteIds.add(routeId);
    });
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

    getCurrentIds() {
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

    getCheckedIds() {
        var ids = [];
        _checkedRouteIds.forEach((id) => ids.push(id));
        return ids;
    },

    getChecked() {
        var checkedRoutes = [];

        _checkedRouteIds.forEach((routeId) => {
            checkedRoutes.push(_routes[routeId]);
        });

        return checkedRoutes;
    },

    isChecked(routeId) {
        return _checkedRouteIds.has(routeId);
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

        case AppConstants.ActionTypes.ROUTE_SHOW:
            _addCurrentRoute(action.routeId);
            _clearCheckedRoutes();
            RouteStore.emitChange();
            break;

        case AppConstants.ActionTypes.ROUTE_HIDE:
            _removeCurrentRoute(action.routeId);
            RouteStore.emitChange();
            break;

        case AppConstants.ActionTypes.ROUTE_CHECK:
            _addCheckedRoute(action.routeId);
            RouteStore.emitChange();
            break;

        case AppConstants.ActionTypes.ROUTE_UNCHECK:
            _removeCheckedRoute(action.routeId);
            RouteStore.emitChange();
            break;

        case AppConstants.ActionTypes.ROUTE_SHOW_MULTIPLE:
            _clearCheckedRoutes();
            _setMultipleRoutes(action.routeIds);
            RouteStore.emitChange();
            break;

        case AppConstants.ActionTypes.ROUTE_HIDE_ALL:
            _clearCurrentRoutes();
            RouteStore.emitChange();
            break;

        default:
            // po op
    }

});

module.exports = RouteStore;
