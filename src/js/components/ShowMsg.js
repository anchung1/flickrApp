var React = require('react');

var ShowMsg = React.createClass({

    render: function() {

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
            </div>
        );
    }

});

module.exports = ShowMsg;