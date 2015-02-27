var React = window.React = require('react');
var App = require('./components/App.react');
var GTFSWebAPIUtils = require('./utils/GTFSWebAPIUtils');
var TrapezeWebAPIUtils = require('./utils/TrapezeWebAPIUtils');
var SocrataWebAPIUtils = require('./utils/SocrataWebAPIUtils');

GTFSWebAPIUtils.getAllRoutes();
TrapezeWebAPIUtils.getAllVehicles();
setInterval(TrapezeWebAPIUtils.getAllVehicles, 10000);
// SocrataWebAPIUtils.getAllVehicles();

React.render(<App />, document.getElementById('app'));

var RouteStore = window.RouteStore = require('./stores/RouteStore');
var StopStore = window.StopStore = require('./stores/StopStore');
var PolylineStore = window.PolylineStore = require('./stores/PolylineStore');
var VehicleStore = window.VehicleStore = require('./stores/VehicleStore');

//
// var fs = require('fs');
// var ProtoBuf = require('protobufjs');
//
// var protoString = fs.readFileSync(__dirname + '/utils/gtfs-realtime.proto');
//
// builder = ProtoBuf.loadProto(protoString);
// root = builder.build();
// VehiclePosition = root.transit_realtime.VehiclePosition;
//
// window.xhr = ProtoBuf.Util.XHR();
// xhr.open("GET", 'https://data.texas.gov/download/i5qp-g5fd/application/octet-stream', true);
// // xhr.responseType = "arraybuffer";
// xhr.onload = function(e) {
//     console.log('res', xhr.response)
//     window.e = e
//     // msg = builder.decode(xhr.response);
//     // console.log(JSON.stringify(msg, null, 4)); // Correctly decoded
// }
// xhr.send(null);
// console.log(builder);
