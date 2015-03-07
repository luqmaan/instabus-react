var request = require('superagent');

var AppServerActionCreators = require('../actions/AppServerActionCreators');

module.exports = {
    getAllVehicles() {
        var url = 'https://data.texas.gov/resource/9e7h-gz56.json';
        request
            .get(url)
            .end((err, res) => {
                var rawVehicles = res.body;
                AppServerActionCreators.receiveVehicles(rawVehicles);
            });
    },
};
