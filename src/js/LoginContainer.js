var React = require('react');
var loginStore = require('../stores/loginStore');
var loginActions = require('../actions/loginActions');
var Login = require('./Login');

var LoginContainer = React.createClass({
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
    handleAddItem: function (newItem) {
        loginActions.addItem(newItem);
    },
    handleRemoveItem: function (index) {
        loginActions.removeItem(index);
    },
    _onChange: function () {
        this.setState({
            login: loginStore.getLogin()
        })
    },
    render: function () {

        return (
            <Login status={this.state.login}></Login>
        );

    }
});

module.exports = LoginContainer;