var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var CHANGE_EVENT = 'change';

var _routes = {};
var _currentRouteIds = [];


function _addRoutes(rawRoutes) {
    rawRoutes.forEach(function(routeData) {
        _routes[routeData.route_id] = routeData;
    });
}


var RouteStore = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        console.log('registered change listener', callback);
        this.on(CHANGE_EVENT, () => {
            console.log('change event fired callback');
            callback();
        });
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get(id) {
        return _routes[id];
    },

    getCurrent() {
        return _currentRouteIds.map(this.get);
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
            console.log('about to RouteStore.emitChange')
            RouteStore.emitChange();
            break;

        default:
            // po op
    }

});

module.exports = RouteStore;
