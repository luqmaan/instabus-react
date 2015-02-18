var App = require('./components/App.react');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

React.render(<App />, document.getElementById('app'));
