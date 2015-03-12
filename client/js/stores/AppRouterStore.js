// var assign = require('object-assign');
// var EventEmitter = require('events').EventEmitter;
//
// var AppDispatcher = require('../dispatcher/AppDispatcher');
// var AppConstants = require('../constants/AppConstants');
// var RouteStore = require('../stores/RouteStore');
// var AppViewActionCreators = require('../actions/AppViewActionCreators');
//
// var CHANGE_EVENT = 'change';
//
// var _path = '';
//
// function _updateAndEmitPath(newPath) {
//     var pathChanged = !!newPath && newPath !== _path;
//     if (pathChanged) {
//         _path = newPath;
//     }
//     return pathChanged;
// }
//
// function _updateFromRouteStore() {
//     if (RouteStore.getCurrentIds().length) {
//         var currentRoutes = RouteStore.getCurrentIds().sort().join('+');
//         _updateAndEmitPath(`/route/${currentRoutes}/`);
//     }
// }
//
// function _updateFromHash(hash) {
//     if (hash.match(/route\/([\w\d]\+*)+\/$/g)) {
//         var routeIds = location.hash.replace('#/route/', '').match(/\d+/g).map(Number);
//         AppViewActionCreators.showMultipleRoutes(routeIds);
//     }
//
//     _path = hash;
// }
//
// var AppRouterStore = assign({}, EventEmitter.prototype, {
//     emitChange() {
//         this.emit(CHANGE_EVENT);
//     },
//
//     addChangeListener(callback) {
//         this.on(CHANGE_EVENT, callback);
//     },
//
//     removeChangeListener(callback) {
//         this.removeListener(CHANGE_EVENT, callback);
//     },
//
//     getPath() {
//         return _path;
//     }
//
// });
//
// AppRouterStore.dispatchToken = AppDispatcher.register((payload) => {
//     AppDispatcher.waitFor([
//         RouteStore.dispatchToken,
//     ]);
//
//     var action = payload.action;
//
//     switch(action.type) {
//         case AppConstants.ActionTypes.ROUTE_SHOW:
//             _updateFromRouteStore();
//             AppRouterStore.emitChange();
//             break;
//         case AppConstants.ActionTypes.ROUTE_HIDE:
//             _updateFromRouteStore();
//             AppRouterStore.emitChange();
//             break;
//         // case AppConstants.ActionTypes.HASH_CHANGE:
//         //     _updateFromHash(action.hash);
//         //     AppRouterStore.emitChange();
//         //     break;
//         default:
//             // po op
//     }
// });
//
// module.exports = AppRouterStore;
