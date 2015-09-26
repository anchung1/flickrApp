var React = require('react');
var Login = require('./Login');
var AccountCreate = require('./AccountCreate');
var loginStore = require('../stores/loginStore');
var loginAction = require('../actions/loginActions');

var LoginContainer = React.createClass({
    getInitialState: function () {
        return {
            createAccount: false,
            createStatus: false,
            message: ''
        };
    },

    componentDidMount: function () {
        loginStore.addCreateChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        loginStore.removeCreateChangeListener(this._onChange);
    },

    _onChange: function() {
        var status = loginStore.getCreateStatus();
        var message = '';

        if (status) {
            message = 'Account created.';
        } else {
            message = 'Account create failure.';
        }

        this.setState({
            createStatus: status,
            message: message
        });

        setTimeout(function() {
            //console.log('firing set timeout');
            this.setState({
                message: ''
            });

        }.bind(this), 5000);

    },

    createAccount: function() {
        this.setState({
            createAccount: true
        });
    },

    doCreateAccount: function(mode, data) {
        this.setState({
            createAccount: false
        });

        if (mode == 'create') {
            //console.log(data);
            loginAction.create(data)
        }
    },

    render: function () {

        var panelStyle = {
            marginTop: '100px',
            paddingBottom: '10px'
        };

        var account = <div></div>
        if (this.state.createAccount) {
            account =
                <div className="panel panel-default col-md-offset-4 col-md-4">
                    <AccountCreate handler={this.doCreateAccount}></AccountCreate>
                </div>
        }

        return (
            <div>
                <div className="panel panel-default col-md-offset-4 col-md-4" style={panelStyle}>
                    <div className="panel-heading text-center"><h3>Nick's Login</h3></div>
                    <div className="text-center"><span className="label label-danger">{this.state.message}</span></div>
                    <Login createAccount={this.createAccount}></Login>
                </div>

                {account}

            </div>

        );

    }
});

module.exports = LoginContainer;