var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var RouteStore = require('../stores/RouteStore');
var GTFSUtils = require('../utils/GTFSUtils');
var SocrataUtils = require('../utils/SocrataUtils');

var CHANGE_EVENT = 'change';

var _vehicles = {};


function _addVehicles(routeId, rawVehicles) {
    rawVehicles.forEach((rawVehicle) => {
        var vehicle = SocrataUtils.convertRawVehicle(rawVehicle);

        _vehicles[vehicle.vehicleId] = vehicle;
    });
}


var VehicleStore = assign({}, EventEmitter.prototype, {
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
        var routeIds = RouteStore.getCurrentIds();
        var vehiclesList = Object.keys(_vehicles).map((key) => _vehicles[key]);

        return vehiclesList.filter((vehicle) => {
            return routeIds.indexOf(vehicle.routeId) !== -1;
        });
    },

    getAll() {
        return _vehicles;
    }
});


VehicleStore.dispatchToken = AppDispatcher.register((payload) => {
    AppDispatcher.waitFor([
        RouteStore.dispatchToken,
    ]);

    var action = payload.action;

    switch(action.type) {
        case AppConstants.ActionTypes.RECEIVE_RAW_VEHICLES:
            _addVehicles(action.routeId, action.rawVehicles);
            VehicleStore.emitChange();
            break;

        default:
            // po op
    }
});

module.exports = VehicleStore;
