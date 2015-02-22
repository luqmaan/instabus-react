var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var RouteStore = require('../stores/RouteStore');

var CHANGE_EVENT = 'change';

var _stops = {};

function _addStops(routeId, rawStops) {
    _stops[routeId] = rawStops;
}


var StopStore = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCurrent() {
        var currentStops = {};

        for (var routeId of RouteStore.getCurrentRouteIds()) {
            (_stops[routeId] || []).forEach((stop) => {
                currentStops[stop.stop_id] = stop;
            });
        }

        return Object.keys(currentStops).map((key) => currentStops[key]);
    },

    getAll() {
        return _stops;
    }
});


StopStore.dispatchToken = AppDispatcher.register((payload) => {
    AppDispatcher.waitFor([
        RouteStore.dispatchToken,
    ]);

    var action = payload.action;

    switch(action.type) {
        case AppConstants.ActionTypes.RECEIVE_RAW_STOPS:
            console.log('receive raw stops')
            _addStops(action.routeId, action.rawStops);
            StopStore.emitChange();
            break;

        default:
            // po op
    }
});

module.exports = StopStore;
