var AppServerActionCreators = require('../actions/AppServerActionCreators');


module.exports = {
    getAllRoutes: function() {
        var rawRoutes = require('../../data/routes.json');

        AppServerActionCreators.receiveAll(rawRoutes);
    }
};
