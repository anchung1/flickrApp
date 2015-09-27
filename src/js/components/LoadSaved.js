var React = require('react');
var loadConstants = require('../constants/loadConstants');

var LoadSave = React.createClass({

    render: function() {

        var style = {
            marginRight: 10
        };

        var okList = this.props.ok;

        var savedBtn = <a className="list-group-item" onClick={this.props.handler}>Load Saved</a>
        if (okList[loadConstants.indexLoadSaved]) {
            savedBtn =
                <a className="list-group-item" onClick={this.props.handler}>Load Saved
                    <span className='glyphicon glyphicon-ok pull-right' style={{color: 'green'}}></span>
                </a>
        }
        return (
            <div>
                {savedBtn}
            </div>
        );
    }

});

module.exports = LoadSave;