var fs = require('fs');
var React = require('react');
var Leaflet = require('leaflet');
var ReactLeaflet = window.ReactLeaflet = require('react-leaflet');
var {Map, Marker, Popup, TileLayer, Polyline, CircleMarker} = ReactLeaflet;

var AppConstants = require('../constants/AppConstants');
var VehicleMarker = require('./VehicleMarker.react.jsx');
var StopMarker = require('./StopMarker.react.jsx');
var RoutePolyline = require('./RoutePolyline.react.jsx');


function getStopMarker(stop) {
    if (!stop) return;
    return (
        <StopMarker
            center={{lat: stop.lat, lng: stop.lon}}
            key={'stop:' + stop.stopId}
            label={stop.name}
            radius={8}
            opacity={1}
            width={2}
            color='rgb(142,139,139)'
            fillColor='rgb(166,163,163)'
            fill={true}
            fillOpacity={0.7} >
        </StopMarker>
    );
}

function getPolylineLayer(polyline) {

    return (
        <RoutePolyline
            positions={polyline.positions}
            key={'polyline:' + polyline.shape_id}
            color='rgb(130,127,122)'
            stroke={true}
            weight={5}
            opacity={0.3}
            smoothFactor={1} />
    );
}

function getVehicleIcon(vehicle) {
    // FIXME: These are not being updated
    var formattedVehicleHtml = AppConstants.Icons.VEHICLE;

    formattedVehicleHtml = formattedVehicleHtml.replace('{svg-transform}', 'rotate(' + vehicle.heading + ' 26 26)');
    formattedVehicleHtml = formattedVehicleHtml.replace('{route-id}', vehicle.routeId);
    formattedVehicleHtml = formattedVehicleHtml.replace('{direction-symbol}', vehicle.directionSymbol);

    var vehicleStatusColors = {
        'green': 'rgb(53,169,38)',
        'orange': 'rgb(206,156,43)',
        'red': 'rgb(207,30,30)',
    };
    formattedVehicleHtml = formattedVehicleHtml.replace(/{vehicle-status-color}/g, vehicleStatusColors[vehicle.updateStatus]);


    var offsetIndex = String(vehicle.routeId).length - 1;
    var xOffsets = [23, 20, 17, 14];
    formattedVehicleHtml = formattedVehicleHtml.replace('{route-id-x-offset}', xOffsets[offsetIndex]);
    var yOffsets = [24, 25, 26, 27.5];
    formattedVehicleHtml = formattedVehicleHtml.replace('{route-id-y-offset}', yOffsets[offsetIndex]);
    var yDirectionOffsets = [35, 36, 37, 39];
    formattedVehicleHtml = formattedVehicleHtml.replace('{direction-symbol-y-offset}', yDirectionOffsets[offsetIndex]);

    return Leaflet.divIcon({
        className: 'vehicle-icon',
        html: formattedVehicleHtml,
    });
}

function getVehicleMarker(vehicle) {
    if (!vehicle) return;
    var icon = getVehicleIcon(vehicle);

    return (
        <VehicleMarker
            position={vehicle.position}
            key={'vehicle:' + vehicle.vehicleId}
            className='vehicle-marker'
            icon={icon}
            animateSteps={200}>
            <Popup>
                <div>{vehicle.vehicleId} {vehicle.updateTime} {vehicle.formattedUpdateTime}</div>
            </Popup>
        </VehicleMarker>
    );
}


var MapSection = React.createClass({
    propTypes: {
        routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        stops: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        polylines: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        vehicles: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },

    getInitialState() {
        return {
            mounted: false,
        };
    },

    componentWillUnmount() {
        this.setState({
            mounted: false,
        });
    },

    render() {
        var stopLayers;
        var polylineLayers;
        var vehicleLayers;

        if (this.state.mounted) {
            stopLayers = this.props.stops.map(getStopMarker);
            polylineLayers = this.props.polylines.map(getPolylineLayer);
            vehicleLayers = this.props.vehicles.map(getVehicleMarker);
        }

        this.state.mounted = true;

        return (
            <div id='map-wrapper'>
                <Map
                    center={this.props.initialPosition}
                    zoom={13}
                    id='map'>
                    <TileLayer
                        url='https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
                        attribution='<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>'
                        id='drmaples.ipbindf8' />
                    {polylineLayers}
                    {stopLayers}
                    {vehicleLayers}
                </Map>
            </div>
        );
    },

});

module.exports = MapSection;
