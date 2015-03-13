function convertRawLocation(rawLocation) {
    var loc = rawLocation.split(',');
    return {
        lat: Number(loc[0]),
        lng: Number(loc[1]),
    };
}

function convertRawUpdateTime(rawTime) {
    return rawTime.replace(/^0/g, '').replace('AM', '').replace('PM', '');
}


module.exports = {
    convertRawVehicle(rawVehicle) {
        return {
            routeId: Number(rawVehicle.route),
            vehicleId: Number(rawVehicle.vehicleid),
            heading: Number(rawVehicle.heading) * 10,
            position: convertRawLocation(rawVehicle.location),
            updateTime: convertRawUpdateTime(rawVehicle.updatetime),
            directionSymbol: rawVehicle.direction,
        };
    },
};
