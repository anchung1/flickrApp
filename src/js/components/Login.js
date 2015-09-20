var React = require('react');
var loginActions = require('../actions/loginActions');

var Login = React.createClass({

    componentDidMount: function() {
        this.refs.userInput.getDOMNode().focus();
    },

    submit: function() {
        var user = this.refs.userInput.getDOMNode().value;
        var pw = this.refs.pwInput.getDOMNode().value;

        if (user && pw) {
            loginActions.loginAction({user: user, pw: pw});
        }
    },

    render: function() {

        var header = <div>Header NONE</div>;
        if (!this.props.status) {
            header = <h3 className="text-center">Nick's Login</h3>
        }

        var body = <div>Body NONE</div>;
        if (!this.props.status) {
            body =
                <div>
                    <div className="panel panel-default col-md-8">
                        <div className="panel-body">
                            <input className="col-md-10 col-md-offset-1" type="text" ref="userInput" placeholder="User name" />
                            <br/>
                            <input className="col-md-10 col-md-offset-1" type="password" ref="pwInput" placeholder="Password" />

                        </div>

                        <div className="panel-footer">
                            <button className="btn btn-primary" onClick={this.submit}>Submit</button>
                        </div>

                    </div>
                </div>
            ;
        }

        return (
            <div>
                {header}
                {body}
            </div>

        );
    }


});

module.exports = Login;