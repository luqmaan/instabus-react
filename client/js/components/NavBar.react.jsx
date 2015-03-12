var React = require('react');

var AppConstants = require('../constants/AppConstants');
var AppViewActionCreators = require('../actions/AppViewActionCreators');


function getTitle(currentRoutes) {
    if (currentRoutes.length) {
        return currentRoutes.map((route) => route.routeId).join(', ');
    }
    return 'Instabus';
}

function getActions(checkedRouteIds) {
    if (checkedRouteIds.length) {
        return <button
                className='draw'
                onClick={AppViewActionCreators.showMultipleRoutes.bind(null, checkedRouteIds)}
                dangerouslySetInnerHTML={{__html: AppConstants.Icons.CHECK}} />;
    }
    return <a className='info' href='#/info' dangerouslySetInnerHTML={{__html: AppConstants.Icons.HELP}} />;
}


var NavBar = React.createClass({

    propTypes: {
        currentRoutes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        checkedRouteIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    },

    render() {
        var title = getTitle(this.props.currentRoutes);
        var actions = getActions(this.props.checkedRouteIds);

        return (
            <div className={this.props.checkedRouteIds.length ? 'navbar checked' : 'navbar'}>
                <a href='#/' className='logo'>
                    <span className='unicon' dangerouslySetInnerHTML={{__html: AppConstants.Icons.MUNICORN}} />
                    <h1>{title}</h1>
                </a>
                <div className='actions'>
                    {actions}
                </div>
            </div>
        );
    },

});

module.exports = NavBar;
