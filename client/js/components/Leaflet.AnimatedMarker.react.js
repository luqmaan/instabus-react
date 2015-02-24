var React = require("react");
var Leaflet = require("leaflet");

var latlngType = require("react-leaflet").PropTypes.latlng;
var popupContainerMixin = require("react-leaflet").mixins.popupContainer;

function easeInOutCubic(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
}

function animateMarker(marker, i, steps, startLatLng, deltaLatLng) {
    var x = easeInOutCubic(i, startLatLng[0], deltaLatLng[0], steps),
        y = easeInOutCubic(i, startLatLng[1], deltaLatLng[1], steps);

    console.log('setLatLng', x, y)

    marker.setLatLng([x, y]);

    if (i < steps) {
        Leaflet.Util.requestAnimFrame(animateMarker.bind(null, marker, i + 1, steps, startLatLng, deltaLatLng), null, false, marker._container);
    }
}

module.exports = React.createClass({
  displayName: "AnimatedMarker",

  mixins: [popupContainerMixin],

  propTypes: {
    position: latlngType.isRequired
  },

  componentWillMount() {
    var {map, position, ...props} = this.props;
    this._leafletElement = Leaflet.marker(position, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.position.lat !== prevProps.position.lat && this.props.position.lng !== prevProps.position.lng) {
        var marker = this.getLeafletElement();
        // marker.setLatLng.setLatLng(this.props.position);
        console.log('animating props from', prevProps.position, 'to', this.props.position)

        var deltaLatLng = [this.props.position.lat - prevProps.position.lat, this.props.position.lng - prevProps.position.lng];
        var steps = 100;
        animateMarker(marker, 0, steps, [ prevProps.position.lat,  prevProps.position.lng], deltaLatLng);
    }
  }
});
