var React = require('react');
var Leaflet = window.Leaflet = require('react-leaflet');
var {Map, Marker, Popup, TileLayer, Polyline, CircleMarker} = Leaflet;


var MapSection = React.createClass({

    propTypes: {
        routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        stops: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },

    render() {
        var stopsList = this.props.stops.map((stop) => {
            return (
                <CircleMarker
                    center={{lat: stop.stop_lat, lng: stop.stop_lon}}
                    key={'stop:' + stop.direction_id + ':' + stop.stop_id}>
                    <Popup>
                        <span>{stop.stop_name}</span>
                    </Popup>
                </CircleMarker>
            );
        }, this);

        return (
            <Map center={this.props.initialPosition} zoom={13} id='map'>
                <TileLayer
                    url='https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
                    attribution='<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>'
                    id='drmaples.ipbindf8' />
                {stopsList}
            </Map>
        );
    },

});

module.exports = MapSection;
