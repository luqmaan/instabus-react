var request = require('superagent');

var AppServerActionCreators = require('../actions/AppServerActionCreators');


module.exports = {
    getAllVehicles() {
        var url = 'http://www.capmetro.org/planner/s_buslocation.asp?route=*';
        var proxyURL = 'http://query.yahooapis.com/v1/public/yql';
        var params = {
            q: 'select * from xml where url="' + url + '"',
            format: 'json'
        };

        request
            .get(proxyURL)
            .query(params)
            .end((err, res) => {
                var rawVehicles = res.body.query.results.Envelope.Body.BuslocationResponse.Vehicles.Vehicle;
                if (!Array.isArray(rawVehicles)) {
                    rawVehicles = [rawVehicles];
                }

                AppServerActionCreators.receiveVehicles(rawVehicles);
            });
    }
};
