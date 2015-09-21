var React = require('react');

var ImageSave = React.createClass({

    render: function() {


        var button = <button className="btn btn-primary" onClick={this.props.save}>Image Save</button>;
        var msg;

        if (this.props.msg) {
            if (this.props.error) {
                msg = <div className="text-center"><span className="label label-danger">{this.props.msg}</span><br/></div>;
            } else {
                msg = <div className="text-center"><span className="label label-info">{this.props.msg}</span><br/></div>;
            }
        }

        return (
            <div>
                {msg}
                {button}
            </div>
        );
    }


});

module.exports = ImageSave;