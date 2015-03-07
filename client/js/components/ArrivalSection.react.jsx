var React = require('react');

var ArrivalSection = React.createClass({

    render() {
        var arrivals = this.props.arrivals.map((arrival) => {
            return (
                <li key={'arrival:' + arrival.vId}>{arrival.est}</li>
            );
        });
        return (
            <ul>
                {arrivals}
            </ul>
        );
    }
});

module.exports = ArrivalSection;
