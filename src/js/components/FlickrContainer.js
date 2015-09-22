var React = require('react');
var flickrStore = require('../stores/flickrStore');
var Flickr = require('./Flickr');
var FlickrControl = require('./FlickrControl');
var flickrActions = require('../actions/flickrActions');
var ImageSave = require('./ImageSave');
var LoadLive = require('./LoadLive');
var LoadSaved = require('./LoadSaved');
var ShowMsg = require('./ShowMsg');
var FlickrSearch = require('./FlickrSearch');

var fetchCount = 20;
var FlickrContainer = React.createClass({
    getInitialState: function () {

        this.maxIndex = fetchCount;
        this.rightClicked = false;
        this.currentUrls = [];
        this.mode = "live";
        this.liveIndex = 0;

        return {
            urls: flickrStore.getUrls(),
            imageIndex: 0,
            saveMsg: flickrStore.getSaveMsg(),
        };
    },
    componentDidMount: function () {
        flickrStore.addFlickrListener(this._onChange);
        flickrStore.addImageSaveListener(this._onImageSaveChange);
        flickrStore.addLoadSavedImageListener(this._onLoadSavedImageChange);
        flickrStore.addRestoreLiveListener(this._onRestoreLiveChange);

        flickrActions.flickrFetchAction(fetchCount);
        //flickrActions.flickrSearchAction(fetchCount, 'girls');

    },
    componentWillUnmount: function () {
        flickrStore.removeFlickrListener(this._onChange);
        flickrStore.removeImageSaveListener(this._onImageSaveChange);
        flickrStore.removeLoadSavedImageListener(this._onLoadSavedImageChange);
        flickrStore.removeRestoreLiveListener(this._onRestoreLiveChange);
    },

    _onChange: function () {
        var moreUrls = flickrStore.getUrls();
        var currentUrls = this.state.urls;

        moreUrls.forEach(function(url) {
            currentUrls.push(url);
        });

        this.currentUrls = currentUrls;
        this.setState({
            urls: currentUrls
        });

        this.maxIndex = this.state.urls.length;
        if (this.rightClicked) {
            this.rightClicked = false;
            this.incrementIndex();
        }

    },

    _onImageSaveChange: function() {
        var msg = flickrStore.getSaveMsg();
        this.setState({
            saveMsg: msg
        });
    },

    _onLoadSavedImageChange: function() {
        var savedUrls = flickrStore.getLoadSavedImages();
        this.maxIndex = savedUrls.length;
        this.mode = 'saved';
        this.liveIndex = this.state.imageIndex;
        this.setState({
            urls: savedUrls,
            imageIndex: 0
        })
    },

    _onRestoreLiveChange: function() {
        this.maxIndex = this.currentUrls.length;
        this.mode = 'live';
        this.setState({
            urls: this.currentUrls,
            imageIndex: this.liveIndex
        })
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

        this.clearMsg();
        this.decrementIndex();
    },

    rightClick: function() {
        if (this.state.imageIndex == this.maxIndex-1) {
            if (this.mode=='saved') return;
            flickrActions.flickrFetchAction(fetchCount);
            //flickrActions.flickrSearchAction(fetchCount, 'girls');

            this.rightClicked = true;
            return;
        }

        this.clearMsg();
        this.incrementIndex();
    },

    saveImage: function() {
        var currentUrl = this.state.urls[this.state.imageIndex];
        flickrActions.saveImage(currentUrl);
    },

    clearMsg: function() {
        flickrActions.saveImageMsgClear();
    },

    loadLive: function() {
        flickrActions.loadLiveImages();
    },

    loadSaved: function() {
        flickrActions.loadSavedImages();

    },

    searchText: function(value) {
        console.log('search text');
        console.log(value);
    },

    render: function () {

        return (
            <div>
                <FlickrControl left={this.leftClick} right={this.rightClick}
                               index={this.state.imageIndex+1} max={this.maxIndex}></FlickrControl>
                <br/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <Flickr image={this.state.urls[this.state.imageIndex]}></Flickr>
                        </div>
                        <div className="col-md-5 col-md-offset-1">
                            <div className="list-group">
                                <ImageSave save={this.saveImage}></ImageSave>
                                <LoadSaved handler={this.loadSaved}></LoadSaved>
                                <LoadLive handler={this.loadLive}></LoadLive>
                                <FlickrSearch handler={this.searchText}></FlickrSearch>
                            </div>

                        </div>
                    </div>
                </div>
                <br/>
                <ShowMsg msg={this.state.saveMsg.msg} error={this.state.saveMsg.error}></ShowMsg>

            </div>
        );

    }
});

module.exports = FlickrContainer;