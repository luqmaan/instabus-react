var React = require('react');
var Leaflet = window.Leaflet = require('react-leaflet');
var {Map, Marker, Popup, TileLayer, Polyline, CircleMarker} = Leaflet;


var MapSection = React.createClass({

    render() {
        var polylinesList = this.props.polylines.map((positions, index) => {
            return (
                <Polyline
                    positions={positions}
                    key={'polyline:' + this.props.routeId + ':' + index} />
            );
        }, this);

        var stopsList = this.props.stops.map((stop, index) => {
            return (
                <CircleMarker
                    center={{lat: stop.stop_lat, lng: stop.stop_lon}}
                    key={'stop:' + this.props.routeId + ':' + stop.direction_id + ':' + stop.stop_id}>
                    <Popup>
                        <span>{stop.stop_name}</span>
                    </Popup>
                </CircleMarker>
            );
        }, this);

        var vehiclesList = this.props.vehicles.map((vehicle, index) => {
            return (
                <CircleMarker
                    center={vehicle}
                    key={'vehicle:' + vehicle.vId + ':' + index}
                    className='vehicle-marker'>
                    <Popup>
                        <span>{vehicle.Routeid}</span>
                    </Popup>
                </CircleMarker>
            );
        });

        return (
            <Map center={this.props.initialPosition} zoom={13} id='map'>
                <TileLayer
                    url='https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
                    attribution='<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>'
                    id='drmaples.ipbindf8' />
                {polylinesList}
                {stopsList}
                {vehiclesList}
            </Map>
        );
    },

});

module.exports = MapSection;
