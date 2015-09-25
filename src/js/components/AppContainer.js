var React = require('react');
var loginStore = require('../stores/loginStore');
var loginActions = require('../actions/loginActions');
var LoginContainer = require('./LoginContainer');
var FlickrContainer = require('./FlickrContainer');

var AppContainer = React.createClass({
    getInitialState: function () {
        return {
            login: loginStore.getLogin()
        }
    },
    componentDidMount: function () {
        loginStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        loginStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            login: loginStore.getLogin()
        })
    },
    render: function () {
        var activeComponent;
        if (this.state.login) {
            activeComponent = <FlickrContainer></FlickrContainer>
        } else {
            activeComponent = <LoginContainer></LoginContainer>
        }

        return (
            <div>
                {activeComponent}
            </div>
        );

    }
});

module.exports = AppContainer;