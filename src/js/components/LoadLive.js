var React = require('react');
var loadConstants = require('../constants/loadConstants');

var LoadLive = React.createClass({

    render: function() {

        var okList = this.props.ok;

        var liveBtn =  <a className="list-group-item" onClick={this.props.handler}>Load Live</a>
        if (okList[loadConstants.indexLoadLive]) {
            liveBtn =
                <a className="list-group-item" onClick={this.props.handler}>Load Live
                    <span className='glyphicon glyphicon-ok pull-right' style={{color: 'green'}}></span>
                </a>
        }

        return (
            <div>{liveBtn}</div>
        );
    }

});

module.exports = LoadLive;