var React = require('react');

var FlickrControl = React.createClass({


    render: function() {
        var style = {
            fontSize: 24,
            top: 5
        };
        //<button className="btn btn-primary" onClick={this.clickHandler}>{this.props.children}</button>

        return(
            <div className="row text-center">
                <span className="glyphicon glyphicon-chevron-left" style={style} onClick={this.props.left}></span>
                <span className="label label-info">Image {this.props.index}/{this.props.max}</span>
                <span className="glyphicon glyphicon-chevron-right" style={style} onClick={this.props.right}></span>
            </div>
        );
    }
});

module.exports = FlickrControl;