var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;


var CHANGE_EVENT = "changeEvent";
var RESTORE_EVENT = 'restoreEvent';
var AUTOPLAY_STOP_EVENT = 'autoplayStopEvent';

var _store = {
    flickrUrls: [],
    flickrErr: {},
    searchText: ''
};

function storeUrls(urls, searchText) {
    if (searchText != _store.searchText) {
        _store.flickrUrls = urls;
        _store.searchText = searchText;
    } else {
        urls.forEach(function(url) {
            _store.flickrUrls.push(url);
        });
    }
}

function saveErr(data) {
    _store.flickrErr = data.msg;
}

var flickrSearchStore = objectAssign({}, EventEmitter.prototype, {

    addFlickrListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeFlickrListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },

    addRestoreSearchListener: function(cb) {
        this.on(RESTORE_EVENT, cb);
    },
    removeRestoreSearchListener: function(cb) {
        this.removeListener(RESTORE_EVENT, cb);
    },
    addAutoPlayStopListener: function(cb) {
        this.on(AUTOPLAY_STOP_EVENT, cb);
    },
    removeAutoPlayStopListener: function(cb) {
        this.removeListener(AUTOPLAY_STOP_EVENT, cb);
    },

    getUrls: function() {
        return _store.flickrUrls;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){

        case appConstants.FLICKR_SEARCH_EVENT:
            storeUrls(action.data.urls, action.data.search);
            flickrSearchStore.emit(CHANGE_EVENT);
            flickrSearchStore.emit(AUTOPLAY_STOP_EVENT);
            break;
        case appConstants.FLICKR_SEARCH_ERR_EVENT:
            saveErr(action.data);
            break;
        case appConstants.FLICKR_RESTORE_SEARCH_EVENT:
            flickrSearchStore.emit(RESTORE_EVENT);
            flickrSearchStore.emit(AUTOPLAY_STOP_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = flickrSearchStore;