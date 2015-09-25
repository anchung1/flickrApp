var React = require('react');
var loginActions = require('../actions/loginActions');

var ENTER_KEY = 13;
var Login = React.createClass({

    componentDidMount: function() {
        this.refs.userInput.getDOMNode().focus();

        console.log(document.body.background);
        document.body.background = 'src/green-background.jpg';
    },

    submit: function() {
        var user = this.refs.userInput.getDOMNode().value;
        var pw = this.refs.pwInput.getDOMNode().value;

        if (user && pw) {
            loginActions.login({user: user, pw: pw});
        }
    },

    keyPress: function(e) {
        if (e.which == ENTER_KEY) {
            this.submit();
        }
    },

    createAccount: function(e) {
        console.log('create account');
    },

    render: function() {


        var headerStyle = {

        };

        var inputStyle = {
        };
        //console.log('render Login');
        var body =
                <div>
                    <div className="panel-heading text-center" style={headerStyle}><h3>Nick's Login</h3></div>

                    <div className="panel-body">
                        <input className="col-md-10 col-md-offset-1" type="text" ref="userInput" placeholder="User name" style={inputStyle}/>
                        <br/>
                        <input className="col-md-10 col-md-offset-1"
                               type="password" ref="pwInput" onKeyPress={this.keyPress} placeholder="Password" style={inputStyle}/>

                    </div>

                    <a onClick={this.props.createAccount}>Create Account</a>
                </div>
            ;


        return (
            <div>
                {body}
            </div>

        );
    }


});

module.exports = Login;