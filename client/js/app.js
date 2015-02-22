var React = window.React = require('react');
var App = require('./components/App.react');
var GTFSWebAPIUtils = require('./utils/GTFSWebAPIUtils');


GTFSWebAPIUtils.getAllRoutes();

React.render(<App />, document.getElementById('app'));

var RouteStore = window.RouteStore = require('./stores/RouteStore');
