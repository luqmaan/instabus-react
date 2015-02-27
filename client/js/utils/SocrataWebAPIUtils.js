var request = require('superagent');

var AppServerActionCreators = require('../actions/AppServerActionCreators');

// var fs = require('fs');
// var ProtoBuf = require('protobufjs');
//
// var protoString = fs.readFileSync(__dirname + '/models/gtfs-realtime.proto');
//
// builder = ProtoBuf.loadProto(protoString);
// root = builder.build();
// VehiclePosition = root.transit_realtime.VehiclePosition;
//
// window.xhr = ProtoBuf.Util.XHR();
// xhr.open("GET", 'https://data.texas.gov/api/file_data/8CsYrnQIng_pcsZcEJ1BtMyAAFKX1RPZbj0L5j0JS4g?filename=VehLoc.pb', true);
// // xhr.responseType = "arraybuffer";
// xhr.onload = function(e) {
//     console.log('res', xhr.response)
//     window.e = e
//     // msg = builder.decode(xhr.response);
//     // console.log(JSON.stringify(msg, null, 4)); // Correctly decoded
// }
// xhr.send(null);
// console.log(builder);

module.exports = {
    getAllVehicles() {
        var url = 'https://data.texas.gov/download/i5qp-g5fd/application/octet-stream';
        var proxyURL = 'http://query.yahooapis.com/v1/public/yql';
        var params = {
            q: `select * from data.uri where url="${url}"`,
            format: 'json'
        };

        request
            .get(proxyURL)
            .query(params)
            .end((err, res) => {
                AppServerActionCreators.receiveVehicles(rawVehicles);
            });
    },
};
