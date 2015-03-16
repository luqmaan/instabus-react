var React = require("react");
var Leaflet = require("leaflet");

var latlngListType = require("react-leaflet").PropTypes.latlngList;
var popupContainerMixin = require("react-leaflet").mixins.popupContainer;

module.exports = React.createClass({
    displayName: "RoutePolyline",

    mixins: [popupContainerMixin],

    propTypes: {
        positions: latlngListType.isRequired
    },

    componentWillMount() {
        var {map, positions, ...props} = this.props;
        this._leafletElement = Leaflet.polyline(positions, props);
    },
    componentDidMount() {
        this._leafletElement.bringToBack();
    }
});
