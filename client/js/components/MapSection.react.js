var React = require('react');
var Leaflet = window.Leaflet = require('react-leaflet');
var {Map, Marker, Popup, TileLayer, Polyline, CircleMarker} = Leaflet;

function getStopMarker(stop) {
    return (
        <CircleMarker
            center={{lat: stop.stop_lat, lng: stop.stop_lon}}
            key={'stop:' + stop.direction_id + ':' + stop.stop_id}>
            <Popup>
                <span>{stop.stop_name}</span>
            </Popup>
        </CircleMarker>
    );
}

function getPolylineLayer(polyline) {
    return (
        <Polyline
            positions={polyline.positions}
            key={'polyline:' + polyline.shapeId} />
    );
}

function getVehicleMarker(vehicle) {
    return (
        <CircleMarker
            center={vehicle.position}
            key={'vehicle:' + vehicle.vehicleId}
            className='vehicle-marker'>
            <Popup>
                <span>{vehicle.routeId}</span>
            </Popup>
        </CircleMarker>
    );
}


var MapSection = React.createClass({
    propTypes: {
        routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        stops: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        poylines: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        vehicles: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },

    render() {
        var stopLayers = this.props.stops.map(getStopMarker);
        var polylineLayers = this.props.poylines.map(getPolylineLayer);
        var vehicleLayers = this.props.vehicles.map(getVehicleMarker);

        return (
            <Map center={this.props.initialPosition} zoom={13} id='map'>
                <TileLayer
                    url='https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
                    attribution='<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>'
                    id='drmaples.ipbindf8' />
                {stopLayers}
                {polylineLayers}
                {vehicleLayers}
            </Map>
        );
    },

});

module.exports = MapSection;
