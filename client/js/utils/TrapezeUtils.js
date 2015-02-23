function convertRawPositions(rawPositions) {
    var latest = rawPositions.Position[0].split(',');
    return {
        lat: Number(latest[0]),
        lng: Number(latest[1]),
    };
}

module.exports = {
    convertRawVehicle(rawVehicle) {
        return {
            routeId: Number(rawVehicle.Route),
            vehicleId: Number(rawVehicle.Vehicleid),
            position: convertRawPositions(rawVehicle.Positions),
        };
    },
};
