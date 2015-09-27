var React = require('react');
var loginStore = require('../stores/loginStore');
var loginActions = require('../actions/loginActions');
var LoginContainer = require('./LoginContainer');
var FlickrContainer = require('./FlickrContainer');
var keepAliveStore = require('../stores/keepAliveStore');
var keepAliveActions = require('../actions/keepAliveActions');

var _ = require('lodash');

var countEvent = 0;
var countSave = 0;
var delay = 300000;

function keepInit() {
    countEvent = 0;
    countSave = 0;

    setTimeout(keepFunc, delay);
}

function keepFunc() {
    if(countEvent == countSave) {
        loginActions.logout();
    } else {
        countSave = countEvent;
        setTimeout(keepFunc, delay);
    }
}


var AppContainer = React.createClass({

    getInitialState: function () {

        return {
            login: loginStore.getLogin()
        }
    },
    componentDidMount: function () {
        loginStore.addChangeListener(this._onChange);
        keepAliveStore.addKAListener(this._onTickle);
    },
    componentWillUnmount: function () {
        loginStore.removeChangeListener(this._onChange);
        keepAliveStore.removeKAListener(this._onTickle);
    },

    _onChange: function () {
        this.setState({
            login: loginStore.getLogin()
        });

        //when a person logs in, start the keepAlive timer
        if (this.state.login == true) {
            keepInit();
        }
    },

    _onTickle: function() {
        countEvent++;
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