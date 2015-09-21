var React = require('react');

var LoadLive = React.createClass({

    render: function() {

        var button = <button className="btn btn-warning" onClick={this.props.handler}>Load Live</button>
        return (
            <div>{button}</div>
        );
    }

});

module.exports = LoadLive;