var React = require('react');

var LoadSave = React.createClass({

    render: function() {

        var style = {
            marginRight: 10
        };
        var savedBtn = <button className="btn btn-warning" onClick={this.props.handlerSaved} style={style}>Load Saved</button>
        var liveBtn = <button className="btn btn-warning" onClick={this.props.handlerLive}>Load Live</button>

        return (
            <div className='row'>
                {savedBtn}
                {liveBtn}
            </div>
        );
    }

});

module.exports = LoadSave;