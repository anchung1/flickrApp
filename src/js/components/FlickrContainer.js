var React = require('react');
var flickrStore = require('../stores/flickrStore');
var Flickr = require('./Flickr');
var FlickrControl = require('./FlickrControl');
var flickrActions = require('../actions/flickrActions');

var fetchCount = 20;
var FlickrContainer = React.createClass({
    getInitialState: function () {

        this.maxIndex = fetchCount;
        this.rightClicked = false;
        return {
            urls: flickrStore.getUrls(),
            imageIndex: 0
        };
    },
    componentDidMount: function () {
        flickrStore.addFlickrListener(this._onChange);
        flickrActions.flickrFetchAction(fetchCount);

    },
    componentWillUnmount: function () {
        flickrStore.removeFlickrListener(this._onChange);
    },

    _onChange: function () {
        var moreUrls = flickrStore.getUrls();
        var currentUrls = this.state.urls;

        moreUrls.forEach(function(url) {
            currentUrls.push(url);
        });

        this.setState({
            urls: currentUrls
        });

        this.maxIndex = this.state.urls.length;
        if (this.rightClicked) {
            this.rightClicked = false;
            this.incrementIndex();
        }

    },

    incrementIndex: function() {
        var index = this.state.imageIndex + 1;
        this.setState({
            imageIndex: index
        });
    },
    decrementIndex: function() {
        var index = this.state.imageIndex - 1;
        this.setState({
            imageIndex: index
        });
    },

    leftClick: function() {
        if (this.state.imageIndex == 0) return;
        this.decrementIndex();
    },

    rightClick: function() {
        if (this.state.imageIndex == this.maxIndex-1) {
            flickrActions.flickrFetchAction(fetchCount);
            this.rightClicked = true;
            return;
        }

        this.incrementIndex();
    },

    render: function () {

        return (
            <div>
                <FlickrControl left={this.leftClick} right={this.rightClick}
                               index={this.state.imageIndex+1} max={this.maxIndex}></FlickrControl>
                <br/>
                <Flickr image={this.state.urls[this.state.imageIndex]}></Flickr>
            </div>

        );

    }
});

module.exports = FlickrContainer;