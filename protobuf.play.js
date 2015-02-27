var yqlRes = ""

var fs = require('fs');
var ProtoBuf = require('protobufjs');

var yqlString = fs.readFileSync(__dirname + '/yqlStr');
var protoString = fs.readFileSync(__dirname + '/client/js/utils/gtfs-realtime.proto');

var builder = ProtoBuf.loadProto(protoString);
var root = builder.build();
var VehiclePosition = root.transit_realtime.VehiclePosition;

debugger;
