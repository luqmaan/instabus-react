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
        return diff + 'm' + updateTime.diff(now, 'seconds');
    }
    else {
        diff = updateTime.diff(now, 'hours');
        return diff + 'h';
    }
}

function formatUpdateStatus(updateTime) {
    var now = moment();
    var diff = updateTime.diff(now, 'minutes') - 1;
    if (diff >= 0) {
        return 'status1';
    }
    else if (diff > -5) {
        return 'status' + Math.abs(diff);
    }
    else {
        return 'status5';
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
            updateTime: rawVehicle.updatetime,
            formattedUpdateTime: formatUpdateTime(updateTime),
            updateStatus: formatUpdateStatus(updateTime),
            directionSymbol: rawVehicle.direction,
        };
    },

    getFleetUpdateTime(rawVehicles) {
        var ts = rawVehicles[0].iso_timestamp;
        return moment(ts).format('h:mm:ss A');
    }
};
