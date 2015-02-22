var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

var App = require('./components/App.react');

var allRoutes = require('../data/routes.json');

React.render(<App />, document.getElementById('app'));
