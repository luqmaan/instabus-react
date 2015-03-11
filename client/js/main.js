var React = window.React = require('react');
var App = require('./components/App.react.jsx');
var GTFSWebAPIUtils = require('./utils/GTFSWebAPIUtils');
var SocrataWebAPIUtils = require('./utils/SocrataWebAPIUtils');
var AppRouter = require('./utils/AppRouter.js');

GTFSWebAPIUtils.getAllRoutes();
SocrataWebAPIUtils.getAllVehicles();
setInterval(SocrataWebAPIUtils.getAllVehicles, 10000);

AppRouter.init();

React.render(<App />, document.getElementById('app'));

var RouteStore = window.RouteStore = require('./stores/RouteStore');
var StopStore = window.StopStore = require('./stores/StopStore');
var PolylineStore = window.PolylineStore = require('./stores/PolylineStore');
var VehicleStore = window.VehicleStore = require('./stores/VehicleStore');
