var React = require('react');
var flickrStore = require('../stores/flickrStore');
var Flickr = require('./Flickr');

var FlickrContainer = React.createClass({
    getInitialState: function () {
        return {
            urls: flickrStore.getUrls()
        };
    },
    componentDidMount: function () {
        flickrStore.addFlickrListener(this._onChange);
    },
    componentWillUnmount: function () {
        flickrStore.removeFlickrListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            urls: flickrStore.getUrls()
        });
    },
    render: function () {

        return (
            <Flickr images={this.state.urls}>Flickr Images</Flickr>
        );

    }
});

module.exports = FlickrContainer;