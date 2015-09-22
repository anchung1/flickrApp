var React = require('react');

var LoadSave = React.createClass({

    render: function() {

        var style = {
            marginRight: 10
        };
        var savedBtn = <a className="list-group-item" onClick={this.props.handler}>Load Saved</a>

        return (
            <div>
                {savedBtn}
            </div>
        );
    }

});

module.exports = LoadSave;