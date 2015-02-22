function _convertRawDirection(rawDirection) {
    return {
        directionId: rawDirection.direction_id,
        headsign: rawDirection.headsign
    };
}


module.exports = {
    convertRawRoute: function(rawRoute) {
        return {
            routeType: rawRoute.route_type,
            routeId: rawRoute.route_id,
            directions: rawRoute.directions.map(_convertRawDirection),
            name: rawRoute.name,
        };
    },
    convertRawPolyline: function(rawPolyline) {
        return {
            shapeId: rawPolyline[0].shape_id,
            positions: rawPolyline,
        };
    }
};
