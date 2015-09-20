var React = require('react');
var Login = require('./Login');

var LoginContainer = React.createClass({

    render: function () {

        return (
            <Login status={this.props.login}></Login>
        );

    }
});

module.exports = LoginContainer;