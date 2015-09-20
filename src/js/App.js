var React = require('react');
var AppContainer = require('./components/AppContainer');


var App = React.createClass({
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <AppContainer />
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
