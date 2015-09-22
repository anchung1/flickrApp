var React = require('react');

var ImageSave = React.createClass({

    render: function() {


        var button = <a className="list-group-item" onClick={this.props.save}>Image Save</a>;
        var msg;



        return (
            <div>
                {button}
            </div>
        );
    }


});

module.exports = ImageSave;