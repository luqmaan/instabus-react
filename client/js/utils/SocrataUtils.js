var moment = require('moment');

function convertRawLocation(rawLocation) {
    var loc = rawLocation.split(',');
    return {
        lat: Number(loc[0]),
        lng: Number(loc[1]),
    };
}

function convertRawUpdateTime(rawTime) {
    return moment(rawTime, 'hh:mm:ss A');
}

function formatUpdateTime(updateTime) {
    var now = moment();
    var diff = updateTime.diff(now, 'minutes');

    if (diff >= 0) {
        return updateTime.diff(now, 'seconds');
    }
    else if (diff < 60) {
        return diff + 'm';
    }
    else {
        diff = updateTime.diff(now, 'hours');
        return diff + 'h';
    }
}


module.exports = {
    convertRawVehicle(rawVehicle) {
        var updateTime = convertRawUpdateTime(rawVehicle.updatetime);

        return {
            routeId: Number(rawVehicle.route),
            vehicleId: Number(rawVehicle.vehicleid),
            heading: Number(rawVehicle.heading) * 10,
            position: convertRawLocation(rawVehicle.location),
            updateTime: updateTime,
            formattedUpdateTime: formatUpdateTime(updateTime),
            directionSymbol: rawVehicle.direction,
        };
    },
};
