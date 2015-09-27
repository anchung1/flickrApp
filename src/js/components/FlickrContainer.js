var React = require('react');

var flickrLiveStore = require('../stores/flickrLiveStore');
var flickrSearchStore = require('../stores/flickrSearchStore');
var flickrSaveStore = require('../stores/flickrSaveStore');

var Flickr = require('./Flickr');
var FlickrControl = require('./FlickrControl');
var flickrActions = require('../actions/flickrActions');
var ImageSave = require('./ImageSave');
var LoadLive = require('./LoadLive');
var LoadSaved = require('./LoadSaved');
var ShowMsg = require('./ShowMsg');
var AutoPlay = require('./AutoPlay');

var FlickrSearch = require('./FlickrSearch');
var keepAliveActions = require('../actions/keepAliveActions');
var loadConstants = require('../constants/loadConstants');

var fetchCount = 100;

//*******Utility functions*******
function fetchSearch(count, searchText, page) {
    flickrActions.flickrSearchAction(count, searchText, page+1);
}

function clearMsg() {
    flickrActions.saveImageMsgClear();
}

function saveIndex(mode, storage, index) {
    if (mode == 'live') {
        storage.live = index;
    }

    if (mode == 'saved') {
        storage.saved = index;
    }

    if (mode == 'search') {
        storage.search = index;
    }
}
//*******End - Utility functions*******

var FlickrContainer = React.createClass({
    getInitialState: function () {

        this.rightClicked = false;
        this.currentUrls = [];
        this.mode = "live";

        this.savedIndex = {live: 0, saved: 0, search: 0};
        this.liveIndex = 0;
        this.searchIndex = 0;
        this.searchOpt = {page: 0, text: ''};

        var okIcon = [false, false, false];
        okIcon[loadConstants.indexLoadLive] = true;

        return {
            urls: flickrLiveStore.getUrls(),
            imageIndex: 0,
            maxIndex: fetchCount,
            saveMsg: flickrSaveStore.getMsg(),
            okIcon: okIcon
        };
    },
    componentDidMount: function () {
        flickrLiveStore.addFlickrListener(this._onChange);
        flickrLiveStore.addRestoreLiveListener(this._onRestoreLiveChange);

        flickrSearchStore.addFlickrListener(this._onSearchChange);
        flickrSearchStore.addRestoreSearchListener(this._onRestoreSearchChange);

        flickrSaveStore.addSaveListener(this._onSaveChange);
        flickrSaveStore.addLoadListener(this._onLoadChange);

        flickrActions.flickrFetchAction(fetchCount);

        document.body.background = 'src/leaf-green-background.jpg';
    },
    componentWillUnmount: function () {
        flickrLiveStore.removeFlickrListener(this._onChange);
        flickrLiveStore.removeRestoreLiveListener(this._onRestoreLiveChange);

        flickrSearchStore.removeFlickrListener(this._onSearchChange);
        flickrSearchStore.removeRestoreSearchListener(this._onRestoreSearchChange);

        flickrSaveStore.removeSaveListener(this._onSaveChange);
        flickrSaveStore.removeLoadListener(this._onLoadChange);

    },

    setMaxIndex: function(val) {
        this.setState({
            maxIndex: val
        });
    },

    //*******Store Events*******
    _onChange: function () {
        var moreUrls = flickrLiveStore.getUrls();
        this.setState({
            urls: moreUrls
        });

        this.setMaxIndex(this.state.urls.length);
        if (this.rightClicked) {
            this.rightClicked = false;
            this.incrementIndex();
        }

    },

    _onSearchChange: function() {
        var searchUrls = flickrSearchStore.getUrls();
        this.setState({
            urls: searchUrls
        });

        //new search item
        if (this.searchOpt.page == 0) {
            this.setIndex(0);
        }

        this.setMaxIndex(this.state.urls.length);
        if (this.rightClicked) {
            this.rightClicked = false;
            this.incrementIndex();
        }
    },


    _onSaveChange: function() {
        var msg = flickrSaveStore.getMsg();
        this.setState({
            saveMsg: msg
        });
    },

    _onLoadChange: function() {
        var savedUrls = flickrSaveStore.getUrls();
        this.setMaxIndex(savedUrls.length);

        this.setState({
            urls: savedUrls,
            imageIndex: this.savedIndex.saved
        })
    },

    _onRestoreLiveChange: function() {
        var urls = flickrLiveStore.getUrls();
        this.setMaxIndex(urls.length);
        this.setState({
            urls: urls,
            imageIndex: this.savedIndex.live
        });
    },

    _onRestoreSearchChange: function() {
        var urls = flickrSearchStore.getUrls();
        this.setMaxIndex(urls.length);
        this.setState({
            urls: urls,
            imageIndex: this.savedIndex.search
        });
    },
    //*******End - Store Events*******


    //*******Index setting and navigation******
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
        keepAliveActions.keepAlive();
        flickrActions.autoPlayStop();

        if (this.state.imageIndex == 0) return;

        clearMsg();
        this.decrementIndex();
    },

    rightClick: function() {
        keepAliveActions.keepAlive();

        //without this, same images will be fetched twice
        if (this.rightClicked) return;

        if (this.state.imageIndex == this.state.maxIndex-1) {

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

        clearMsg();
        this.incrementIndex();
    },
    //*******End - Index setting and navigation******


    //*******View event callbacks*******
    indexHandler: function(value) {

        value -= 1;

        if (value < 0) value = 0;
        if (value >= this.state.maxIndex-1) value = this.state.maxIndex-1;
        this.setIndex(value);

    },
    saveImage: function() {
        if (this.mode == 'saved') return;
        var currentUrl = this.state.urls[this.state.imageIndex];
        flickrActions.saveImage(currentUrl);
    },
    loadLive: function() {
        if (this.mode == 'live') return;
        saveIndex(this.mode, this.savedIndex, this.state.imageIndex);


        this.mode = 'live';
        flickrActions.loadLiveImages();

        this.setOkIcon(loadConstants.indexLoadLive);

    },

    loadSaved: function() {
        if (this.mode == 'saved') return;
        saveIndex(this.mode, this.savedIndex, this.state.imageIndex);

        this.mode = 'saved';
        flickrActions.loadSavedImages();

        this.setOkIcon(loadConstants.indexLoadSaved);


    },
    searchText: function(value) {
        if (this.mode == 'search' && value == this.searchOpt.text) return;
        saveIndex(this.mode, this.savedIndex, this.state.imageIndex);

        this.mode = 'search';
        if (value != this.searchOpt.text) {
            console.log('doing new search');
            this.searchOpt.page = 0;
            this.searchOpt.text = value;
            flickrActions.flickrNewSearchAction(fetchCount, value, 1);

        } else {
            console.log('same search found');
            flickrActions.loadSearchImages();

        }

        this.setOkIcon(loadConstants.indexLoadSearch);

    },
    autoPlay: function() {
        //console.log('auto play');
        this.rightClick();
    },

    setOkIcon: function(index) {

        var icons = [false, false, false];
        icons[index] = true;

        this.setState({
            okIcon: icons
        });
    },


    //*******End - View event callbacks*******

    render: function () {

        return (
            <div>
                <FlickrControl left={this.leftClick} right={this.rightClick}
                               index={this.state.imageIndex+1} max={this.state.maxIndex}
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
                                <LoadSaved handler={this.loadSaved} ok={this.state.okIcon}></LoadSaved>
                                <LoadLive handler={this.loadLive} ok={this.state.okIcon}></LoadLive>
                                <FlickrSearch handler={this.searchText} ok={this.state.okIcon}></FlickrSearch>
                            </div>


                            <AutoPlay handler={this.autoPlay}></AutoPlay>

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