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

var fetchCount = 10;

function fetchSearch(count, searchText, page) {
    flickrActions.flickrSearchAction(count, searchText, page);
}

var FlickrContainer = React.createClass({
    getInitialState: function () {

        this.maxIndex = fetchCount;
        this.rightClicked = false;
        this.currentUrls = [];
        this.mode = "live";
        this.liveIndex = 0;
        this.searchOpt = {page: 0, text: ''};

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

        flickrStore.addFlickrSearchListener(this._onSearchChange);


        flickrActions.flickrFetchAction(fetchCount);
    },
    componentWillUnmount: function () {
        flickrStore.removeFlickrListener(this._onChange);
        flickrStore.removeImageSaveListener(this._onImageSaveChange);
        flickrStore.removeLoadSavedImageListener(this._onLoadSavedImageChange);
        flickrStore.removeRestoreLiveListener(this._onRestoreLiveChange);
        flickrStore.removeFlickrSearchListener(this._onSearchChange);

    },

    addUrls: function(moreUrls) {
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

    _onChange: function () {
        var moreUrls = flickrStore.getUrls();
        this.addUrls(moreUrls);
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

        this.setState({
            urls: savedUrls,
            imageIndex: 0
        })
    },

    _onRestoreLiveChange: function() {
        this.maxIndex = this.currentUrls.length;
        this.setState({
            urls: this.currentUrls,
            imageIndex: this.liveIndex
        })
    },

    _onSearchChange: function() {
        var searchUrls = flickrStore.getSearchUrls();
        this.addUrls(searchUrls);
    },

    setIndex: function(val) {
        this.setState({
            imageIndex: val
        });
    },

    incrementIndex: function() {
        var index = this.state.imageIndex + 1;
        this.setIndex(index);
    },
    decrementIndex: function() {
        var index = this.state.imageIndex - 1;
        this.setIndex(index);
    },

    leftClick: function() {
        if (this.state.imageIndex == 0) return;

        this.clearMsg();
        this.decrementIndex();
    },

    rightClick: function() {
        if (this.state.imageIndex == this.maxIndex-1) {

            //this prevents loading of more images.
            if (this.mode=='saved') return;
            if (this.mode=='live') flickrActions.flickrFetchAction(fetchCount);
            if (this.mode=='search') {
                var text = this.searchOpt.text;
                var page = ++this.searchOpt.page;
                fetchSearch(fetchCount, text, page);
            }

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
        if (this.mode == 'live') return;

        this.searchOpt = {page: 0, text: ''};

        if (this.mode != 'live') {
            this.state.urls = [];
        }
        this.mode = 'live';
        flickrActions.loadLiveImages();
    },

    loadSaved: function() {
        if (this.mode == 'live') {
            this.liveIndex = this.state.imageIndex;
        }

        this.searchOpt = {page: 0, text: ''};
        this.mode = 'saved';

        flickrActions.loadSavedImages();

    },

    searchText: function(value) {
        if (this.mode == 'live') {
            this.liveIndex = this.state.imageIndex;
        }

        if (value != this.searchOpt.text) {
            this.searchOpt.page = 0;
            this.searchOpt.text = value;
        }

        if (this.mode != 'search') {
            this.state.urls = [];
        }

        this.mode = 'search';
        fetchSearch(fetchCount, value, 0);
    },

    indexHandler: function(value) {

        value -= 1;

        if (value < 0) value = 0;
        if (value >= this.maxIndex-1) value = this.maxIndex-1;
        this.setIndex(value);

    },

    render: function () {

        return (
            <div>
                <FlickrControl left={this.leftClick} right={this.rightClick}
                               index={this.state.imageIndex+1} max={this.maxIndex}
                                handler={this.indexHandler}></FlickrControl>
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