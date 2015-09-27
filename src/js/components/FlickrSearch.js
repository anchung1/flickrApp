var React = require('react');
var loadConstants = require('../constants/loadConstants');

var ENTER_KEY = 13;
var FlickrSearch = React.createClass({

    submit: function() {
        var value = this.refs.searchItem.getDOMNode().value;
        //this.refs.searchItem.getDOMNode().value = '';
        this.props.handler(value);
    },
    search: function() {
        this.submit();
    },

    keyPress: function(event) {
        if (event.which == ENTER_KEY) {
            this.submit();
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

        var okList = this.props.ok;

        var searchBtn = <div className="list-group-item" onMouseOver={this.hover} onMouseOut={this.hoverOut}>
                            <span className="label label-warning" style={style} onClick={this.search}>Search Flickr:</span>
                            <input type="text" ref="searchItem" placeholder="Search text" onKeyPress={this.keyPress}/>
                        </div>;
        if (okList[loadConstants.indexLoadSearch]) {
            searchBtn =
                <div className="list-group-item" onMouseOver={this.hover} onMouseOut={this.hoverOut}>
                    <span className="label label-warning" style={style} onClick={this.search}>Search Flickr:</span>
                    <input type="text" ref="searchItem" placeholder="Search text" onKeyPress={this.keyPress}/>

                    <span className='glyphicon glyphicon-ok pull-right' style={{color: 'green'}}></span>
                </div>
        }

        return (
            <div>
                {searchBtn}
            </div>
        );
    }

});

module.exports = FlickrSearch;