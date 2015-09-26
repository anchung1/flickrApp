var React = require('react');

//name, password, email

var ids = ['idUser', 'idPass', 'idPass1', 'idEmail', 'idEmail1'];
var ALL_PASS = 3;
var ENTER_KEY = 13;
var ESC_KEY = 27;

var AccountCreate = React.createClass({
    getInitialState: function () {

        this.passVal  = 0;
        return {
            UserName: '',
            Password: '',
            Password1: '',
            Email: '',
            Email1: ''
        };
    },
    componentDidMount: function () {

        var node = this.refs.table.getDOMNode();
        node.align = 'center';

        var input = this.refs.UserName.getDOMNode();
        input.focus();

    },
    hover: function(e) {
        //http://javascript.info/tutorial/basic-dom-node-properties

        if (e.target.nodeName == 'TD') {
            var children = e.target.childNodes;
            for (var i=0; i<children.length; i++) {
                var child = children[i];
                if (child.nodeName == 'INPUT') {
                    child.focus();
                }
            }
        }

        if (e.target.nodeName == 'INPUT') {
            e.target.focus();
        }


    },
    setValue: function(id, value) {
        switch(id) {
            case 'idUser':
                this.setState({
                    UserName: value
                });
                break;
            case 'idPass':
                this.setState({
                    Password: value
                });
                break;
            case 'idPass1':
                this.setState({
                    Password1: value
                });
                break;
            case 'idEmail':
                this.setState({
                    Email: value
                });
                break;
            case 'idEmail1':
                this.setState({
                    Email1: value
                });
                break;
            default:
                break;
        }
    },

    blur: function(event) {
        var node = event.target;
        this.setValue(node.id, node.value);
    },

    keyPress: function(event) {
        var node = event.target;

        //console.log(event.which);
        if (event.which == ESC_KEY) {
            this.props.handler('cancel');
        }

        if (event.which == ENTER_KEY) {
            if (this.passVal == ALL_PASS) {
                this.props.handler('create',
                    {user: this.state.UserName, pw: this.state.Password, email: this.state.Email});
            } else {
                this.setValue(node.id, node.value);
            }
        }

    },

    render: function () {
        var inputStyle = {

        };

        var glyphStyle = {
            color: 'red'
        };

        var tableStyle = {
            width: '175px'
        };

        var tdStyle = {
            borderTop: 'none !important'
        };

        var tdTopStyle = {
            borderTop: 'none !important',
            paddingBottom: '0px'
        };
        var tdBotStyle = {
            borderTop: 'none !important',
            paddingTop: '0px'
        };


        this.passVal = 0;
        var asterisk = <span className="glyphicon glyphicon-asterisk" style={glyphStyle}></span>;
        var userAsterisk = asterisk;
        var passAsterisk = asterisk;
        var pass1Asterisk = asterisk;
        var emailAsterisk = asterisk;
        var email1Asterisk = asterisk;
        if (this.state.UserName) {
            this.passVal++;
            userAsterisk = <div></div>
        }
        if (this.state.Password && (this.state.Password == this.state.Password1)) {
            this.passVal++;
            passAsterisk = <div></div>
            pass1Asterisk = <div></div>
        }

        var errorMsg = '';
        if (this.state.Email && (this.state.Email == this.state.Email1)) {
            var split = this.state.Email.split('@');
            if (split.length < 2) {
                errorMsg = 'Invalid email format';

            } else if (split[1].length == 0){
                 errorMsg = 'Invalid email format';

            } else {
                this.passVal++;
                emailAsterisk = <div></div>
                email1Asterisk = <div></div>
            }

        }

        if (this.passVal == ALL_PASS) {
            errorMsg = "Enter to create, Esc to cancel";
        }

        return (
            <div>
                <p>Create an Account:</p>

                <div className="panel-body">

                    <table ref='table' className="table table-condensed" style={tableStyle}>
                        <tr onMouseOver={this.hover}>
                            <td style={tdStyle}><input ref='UserName' id={ids[0]} type="text" placeholder="User name" onKeyDown={this.keyPress} onBlur={this.blur}/></td>
                            <td style={tdStyle}>{userAsterisk}</td>
                        </tr>
                        <tr onMouseOver={this.hover}>
                            <td style={tdTopStyle}><input type="password" id={ids[1]} placeholder="Password" onKeyDown={this.keyPress} onBlur={this.blur}/></td>
                            <td style={tdTopStyle}>{passAsterisk}</td>

                        </tr>
                        <tr onMouseOver={this.hover}>
                            <td style={tdBotStyle}><input type="password" id={ids[2]} placeholder="Repeat Password" onKeyDown={this.keyPress} onBlur={this.blur}/></td>
                            <td style={tdBotStyle}>{pass1Asterisk}</td>

                        </tr>
                        <tr onMouseOver={this.hover}>
                            <td style={tdTopStyle}><input type="text" id={ids[3]} placeholder="Email Adress" onKeyDown={this.keyPress} onBlur={this.blur}/></td>
                            <td style={tdTopStyle}>{emailAsterisk}</td>

                        </tr>
                        <tr onMouseOver={this.hover}>
                            <td style={tdBotStyle}><input type="text" id={ids[4]} placeholder="Repeat Email" onKeyDown={this.keyPress} onBlur={this.blur}/></td>
                            <td style={tdBotStyle}>{email1Asterisk}</td>

                        </tr>
                    </table>

                    <div className="text-center"><span className="label label-danger">{errorMsg}</span></div>
                </div>


            </div>
        );

    }
});

module.exports = AccountCreate;