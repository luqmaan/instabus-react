var fs = require('fs');
var React = require('react');
var Leaflet = require('leaflet');
var ReactLeaflet = window.ReactLeaflet = require('react-leaflet');
var {Map, Popup, TileLayer} = ReactLeaflet;

var VehicleMarker = require('./VehicleMarker.react.jsx');
var StopMarker = require('./StopMarker.react.jsx');
var RoutePolyline = require('./RoutePolyline.react.jsx');
var MapLegend = require('./MapLegend.react.jsx');


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

function getVehicleMarker(vehicle) {
    if (!vehicle) return;
    return (
        <VehicleMarker
            position={vehicle.position}
            key={'vehicle:' + vehicle.vehicleId}
            className='vehicle-marker'
            vehicleUpdateStatus={vehicle.vehicleUpdateStatus}
            heading={vehicle.heading}
            routeId={vehicle.routeId}
            directionSymbol={vehicle.directionSymbol}
            updateStatus={vehicle.updateStatus}
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
        fleetUpdateTime: React.PropTypes.string.isRequired,
    },

    render() {
        var stopLayers = this.props.stops.map(getStopMarker);
        var polylineLayers = this.props.polylines.map(getPolylineLayer);
        var vehicleLayers = this.props.vehicles.map(getVehicleMarker);

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
                <MapLegend fleetUpdateTime={this.props.fleetUpdateTime}/>
            </div>
        );
    },

});

module.exports = MapSection;
