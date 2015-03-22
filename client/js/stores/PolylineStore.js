var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var RouteStore = require('../stores/RouteStore');
var GTFSUtils = require('../utils/GTFSUtils');

var CHANGE_EVENT = 'change';

var _polylines = {};

function _addPolylines(routeId, rawPolylines) {
    _polylines[routeId] = rawPolylines.shapes;
}


var PolylineStore = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getPolylinesForRoute(routeId) {
        return _polylines[routeId];
    },

    getCurrent() {
        var currentPolylines = [];

        RouteStore.getCurrentIds().forEach((routeId) => {
            if (this.getPolylinesForRoute(routeId)) {
                this.getPolylinesForRoute(routeId).forEach((polyline) => {
                    currentPolylines.push(polyline);
                });
            }
        }, this);

        return currentPolylines;
    },

    getAll() {
        return _polylines;
    }
});


PolylineStore.dispatchToken = AppDispatcher.register((payload) => {
    // AppDispatcher.waitFor([
    //     RouteStore.dispatchToken,
    // ]);

    var action = payload.action;

    switch(action.type) {
        case AppConstants.ActionTypes.RECEIVE_RAW_POLYLINES:
            _addPolylines(action.routeId, action.rawPolylines);
            PolylineStore.emitChange();
            break;

        default:
            // po op
    }
});

PolylineStore._ = _polylines;

module.exports = PolylineStore;
