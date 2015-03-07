function convertRawLocation(rawLocation) {
    var loc = rawLocation.split(',');
    return {
        lat: Number(loc[0]),
        lng: Number(loc[1]),
    };
}

function convertRawTime(rawTime) {
    return rawTime;
}

module.exports = {
    convertRawVehicle(rawVehicle) {
        return {
            routeId: Number(rawVehicle.route),
            vehicleId: Number(rawVehicle.vehicleid),
            heading: Number(rawVehicle.heading) * 10,
            position: convertRawLocation(rawVehicle.location),
            updateTime: convertRawTime(rawVehicle.iso_timestamp),
        };
    },
};
