var React = require('react');
var flickrActions = require('../actions/flickrActions');

var Login = React.createClass({
    clickHandler: function(event) {
        flickrActions.flickrFetchAction();
    },

    render: function() {

        console.log('flickr render');
        console.log(this.props.images);
        console.log(this.props.images.length);

        if (this.props.images.length > 0) {
            var imageItems = this.props.images.map(function(item, i) {
                console.log(item);
                return (
                    <img src={item} key={i}/>
                );
            });
        }
        //<img src="https://farm1.staticflickr.com/778/21513186802_951f457faa.jpg" />

        return (
            <div>
                <button className="btn btn-primary" onClick={this.clickHandler}>{this.props.children}</button>
                {imageItems}
            </div>
        );
    }


});

module.exports = Login;