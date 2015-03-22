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
    convertRawStop: function(rawStop) {
        return {
            lat: Number(rawStop.stop_lat),
            lon: Number(rawStop.stop_lon),
            stopId: rawStop.stop_id,
            name: rawStop.stop_name,
            desc: rawStop.stop_desc,
            directionId: rawStop.direction_id,
        };
    }
};
