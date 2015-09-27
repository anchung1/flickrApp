var React = require('react');

var ENTER_KEY = 13;
var FlickrSearch = React.createClass({

    keyPress: function(event) {
        if (event.which == ENTER_KEY) {
            var value = this.refs.searchItem.getDOMNode().value;
            //this.refs.searchItem.getDOMNode().value = '';
            this.props.handler(value);
        }

    },

    hover: function(event) {
        this.refs.searchItem.getDOMNode().focus();
        this.refs.searchItem.getDOMNode().select();
    },

    hoverOut: function(event) {
        //this.refs.searchItem.getDOMNode().blur();
    },

    render: function() {

        var style = {
            marginRight: 5
        };
        var searchBtn = <div className="list-group-item" onMouseOver={this.hover} onMouseOut={this.hoverOut}>
                            <span className="label label-warning" style={style}>Search Flickr:</span>
                            <input type="text" ref="searchItem" placeholder="Search text" onKeyPress={this.keyPress}/>
                        </div>;

        return (
            <div>
                {searchBtn}
            </div>
        );
    }

});

module.exports = FlickrSearch;