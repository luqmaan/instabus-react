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
    var minutes = now.diff(updateTime, 'minutes');
    var seconds = now.diff(updateTime, 'seconds');

    if (minutes === 0 && seconds < 60) {
        return `${seconds} seconds ago`;
    }
    else if (minutes < 60) {
        if (seconds % 60 > 10) {
            return `${minutes} minutes ${seconds % 60} seconds ago`;
        }
        return `${minutes} minutes ago`;
    }
    else {
        var hours = updateTime.diff(now, 'hours', true);
        return `${hours} hours ago`;
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
