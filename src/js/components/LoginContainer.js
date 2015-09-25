var React = require('react');
var Login = require('./Login');
var AccountCreate = require('./AccountCreate');

var LoginContainer = React.createClass({
    getInitialState: function () {
        return {
            createAccount: false
        };
    },

    createAccount: function() {
        this.setState({
            createAccount: true
        });
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
                    <AccountCreate></AccountCreate>
                </div>
        }

        return (
            <div>
                <div className="panel panel-default col-md-offset-4 col-md-4" style={panelStyle}>

                    <Login createAccount={this.createAccount}></Login>
                </div>

                {account}

            </div>

        );

    }
});

module.exports = LoginContainer;