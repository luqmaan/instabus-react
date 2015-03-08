var React = require("react");
var Leaflet = require("leaflet");
var latlngType = require("react-leaflet").PropTypes.latlng;
var popupContainerMixin = require("react-leaflet").mixins.popupContainer;
require('leaflet.label');

function easeInOutCubic(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
}

function animateMarker(marker, i, steps, startLatLng, deltaLatLng) {
    var x = easeInOutCubic(i, startLatLng[0], deltaLatLng[0], steps),
        y = easeInOutCubic(i, startLatLng[1], deltaLatLng[1], steps);

    marker.setLatLng([x, y]);

    if (i < steps) {
        Leaflet.Util.requestAnimFrame(animateMarker.bind(null, marker, i + 1, steps, startLatLng, deltaLatLng), null, false, marker._container);
    }
}


// Based on https://github.com/PaulLeCam/react-leaflet/blob/ba19dfc3db363b3b38a1d4131186d9168efc9504/src/Marker.js
module.exports = React.createClass({
  displayName: 'VehicleMarker',

  mixins: [popupContainerMixin],

  propTypes: {
    position: latlngType.isRequired,
    animateSteps: React.PropTypes.number.isRequired,
    label: React.PropTypes.string,
  },

  componentWillMount() {
    var {map, position, ...props} = this.props;
    this._leafletElement = Leaflet.marker(position, props);

    if (this.props.label) {
        this._leafletElement.bindLabel(this.props.label, {
            noHide: true,
            direction: 'left',
            className: 'vehicle-leaflet-label',
            offset: [25, -10],
       });
    }
  },

  componentDidUpdate(prevProps) {
    if (this.props.position.lat !== prevProps.position.lat && this.props.position.lng !== prevProps.position.lng) {
        var marker = this.getLeafletElement();
        var deltaLatLng = [this.props.position.lat - prevProps.position.lat, this.props.position.lng - prevProps.position.lng];
        animateMarker(marker, 0, this.props.animateSteps, [ prevProps.position.lat,  prevProps.position.lng], deltaLatLng);
    }
  }
});
