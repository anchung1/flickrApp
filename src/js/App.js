var React = require('react');
var LoginContainer = require('./components/LoginContainer');


var App = React.createClass({
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <LoginContainer />
                </div>
            </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('app')
);


/*
var React = require('react');
var Parent = require('./Parent');

React.render(<Parent />, document.getElementById('app'));
*/
