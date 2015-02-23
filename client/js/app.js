var React = window.React = require('react');
var App = require('./components/App.react');
var GTFSWebAPIUtils = require('./utils/GTFSWebAPIUtils');
var TrapezeWebAPIUtils = require('./utils/TrapezeWebAPIUtils');


GTFSWebAPIUtils.getAllRoutes();
TrapezeWebAPIUtils.getAllVehicles();
setInterval(TrapezeWebAPIUtils.getAllVehicles, 10000);

React.render(<App />, document.getElementById('app'));

var RouteStore = window.RouteStore = require('./stores/RouteStore');
var StopStore = window.StopStore = require('./stores/StopStore');
var PolylineStore = window.PolylineStore = require('./stores/PolylineStore');
var VehicleStore = window.VehicleStore = require('./stores/VehicleStore');
