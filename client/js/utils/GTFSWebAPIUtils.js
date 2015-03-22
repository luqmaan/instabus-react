var request = require('superagent');

var AppServerActionCreators = require('../actions/AppServerActionCreators');

module.exports = {
    getAllRoutes() {
        request
            .get('/gtfs/routes.json')
            .end((err, res) => {
                var rawVehicles = res.body;
                AppServerActionCreators.receiveRoutes(rawVehicles);
            });
    },

    getStopsForRoute(routeId) {
        // FIXME: fetch this
        setTimeout(function() {
            // AppServerActionCreators.receiveStops(routeId, rawStops);
        }, 0);
    },

    getPolylinesForRoute(routeId) {
        // FIXME: fetch this
        setTimeout(function() {
            // AppServerActionCreators.receivePolylines(routeId, rawPolylines);
        }, 0);
    }
};
