var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var CHANGE_IMAGE_SAVE_EVENT = "changeImageSave";
var CHANGE_LOAD_SAVED_IMAGES_EVENT = "changeLoadSavedImages";
var CHANGE_RESTORE_LIVE_EVENT = "changeRestoreLive";
var CHANGE_SEARCH_EVENT = "changeSearchEvent";

var _store = {
    flickrUrls: [],
    flickrErr: {},
    flickrSaveMsg: {},
    flickrSavedImages: [],
    flickrSearchUrls: [],
    flickrSearchErr: {}
};

function storeUrls(data) {
    _store.flickrUrls = data;
}
function saveErr(data) {
    _store.flickrErr = data.msg;
}

function saveMsg(data) {
    _store.flickrSaveMsg = data;
}
function setSavedImages(data) {
    _store.flickrSavedImages = data;
}

function storeSearchUrls(data) {
    _store.flickrSearchUrls = data;
}
function saveSearchErr(data) {
    _store.flickrSearchErr = data;
}


var flickrStore = objectAssign({}, EventEmitter.prototype, {
    addFlickrListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeFlickrListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    getUrls: function() {
        return _store.flickrUrls;
    },

    addImageSaveListener: function(cb) {
        this.on(CHANGE_IMAGE_SAVE_EVENT, cb);
    },
    removeImageSaveListener: function(cb) {
        this.removeListener(CHANGE_IMAGE_SAVE_EVENT, cb);
    },
    getSaveMsg: function() {
        return _store.flickrSaveMsg;
    },


    addLoadSavedImageListener: function(cb) {
        this.on(CHANGE_LOAD_SAVED_IMAGES_EVENT, cb);
    },
    removeLoadSavedImageListener: function(cb) {
        this.removeListener(CHANGE_LOAD_SAVED_IMAGES_EVENT, cb);
    },
    getLoadSavedImages: function() {
        return _store.flickrSavedImages;
    },


    addRestoreLiveListener: function(cb) {
        this.on(CHANGE_RESTORE_LIVE_EVENT, cb);
    },
    removeRestoreLiveListener: function(cb) {
        this.removeListener(CHANGE_RESTORE_LIVE_EVENT, cb);
    },


    addFlickrSearchListener: function(cb) {
        this.on(CHANGE_SEARCH_EVENT, cb);
    },
    removeFlickrSearchListener: function(cb) {
        this.removeListener(CHANGE_SEARCH_EVENT, cb);
    },
    getSearchUrls: function() {
        return _store.flickrSearchUrls;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.FLICKR_URL:
            storeUrls(action.data);
            flickrStore.emit(CHANGE_EVENT);
            break;

        case appConstants.FLICKR_URL_ERR:
            saveErr(action.data);
            break;
        case appConstants.FLICKR_SAVE_EVENT:
            saveMsg(action.data);
            flickrStore.emit(CHANGE_IMAGE_SAVE_EVENT);
            break;

        case appConstants.FLICKR_SAVED_IMAGES_EVENT:
            setSavedImages(action.data);
            flickrStore.emit(CHANGE_LOAD_SAVED_IMAGES_EVENT);
            break;

        case appConstants.FLICKR_RESTORE_LIVE_EVENT:
            flickrStore.emit(CHANGE_RESTORE_LIVE_EVENT);
            break;

        case appConstants.FLICKR_SEARCH_EVENT:
            storeSearchUrls(action.data);
            flickrStore.emit(CHANGE_SEARCH_EVENT);
            break;
        case appConstants.FLICKR_SEARCH_ERR_EVENT:
            saveSearchErr(action.data);
            break;
        default:
            return true;
    }
});

module.exports = flickrStore;