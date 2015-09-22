var React = require('react');

var LoadLive = React.createClass({

    render: function() {

        var liveBtn =  <a className="list-group-item" onClick={this.props.handler}>Load Live</a>

        return (
            <div>{liveBtn}</div>
        );
    }

});

module.exports = LoadLive;