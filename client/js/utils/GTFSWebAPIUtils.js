var request = require('superagent');

var AppServerActionCreators = require('../actions/AppServerActionCreators');

module.exports = {
    getAllRoutes() {
        request
            .get('gtfs/routes.json')
            .end((err, res) => {
                // FIXME: Create error
                var rawVehicles = res.body;
                AppServerActionCreators.receiveRoutes(rawVehicles);
            });
    },

    getStopsForRoute(routeId) {
        request
            .get(`gtfs/stops_${routeId}.json`)
            .end((err, res) => {
                // FIXME: Create error action
                var rawStops = res.body;
                AppServerActionCreators.receiveStops(routeId, rawStops);
            });
    },

    getPolylinesForRoute(routeId) {
        request
            .get(`gtfs/shapes_${routeId}.json`)
            .end((err, res) => {
                // FIXME: Create error action
                var rawPolylines = res.body;
                AppServerActionCreators.receivePolylines(routeId, rawPolylines);
            });
    }
};
