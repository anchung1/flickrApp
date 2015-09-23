var React = require('react');

var ENTER_KEY = 13;
var FlickrControl = React.createClass({

    hover: function(event) {
        this.refs.inputItem.getDOMNode().focus();
    },

    hoverOut: function(event) {
        this.refs.inputItem.getDOMNode().blur();
    },

    keyPress: function(event) {
        if (event.which == ENTER_KEY) {
            var value = this.refs.inputItem.getDOMNode().value;
            this.props.handler(parseInt(value));
            this.refs.inputItem.getDOMNode().value = '';
        }
    },
    render: function() {
        var style = {
            fontSize: 24,
            top: 5
        };

        var inpWidth = 30;
        for (var i=100;;) {
            if (this.props.index < i) break;
            inpWidth += 5;
            i *= 10;
        }

        var inputStyle = {
            width: inpWidth
        };

        //<button className="btn btn-primary" onClick={this.clickHandler}>{this.props.children}</button>

        return(
            <div className="row text-center" onMouseOver={this.hover} onMouseOut={this.hoverOut}>
                <span className="glyphicon glyphicon-chevron-left" style={style} onClick={this.props.left}></span>
                    <span className="label label-info">Image: </span>
                    <input type="text" ref="inputItem" placeholder={this.props.index} style={inputStyle} onKeyPress={this.keyPress}/>
                    <span className="label label-info">/{this.props.max}</span>

                <span className="glyphicon glyphicon-chevron-right" style={style} onClick={this.props.right}></span>
            </div>
        );
    }
});

module.exports = FlickrControl;