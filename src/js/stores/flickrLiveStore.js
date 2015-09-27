var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'changeEvent';
var RESTORE_EVENT = "restoreEvent";
var AUTOPLAY_STOP_EVENT = 'autoplayStopEvent';

var _store = {
    flickrUrls: [],
    flickrErr: {}
};


function storeUrls(urls) {
    urls.forEach(function(url) {
        _store.flickrUrls.push(url);
    });
}

function saveErr(data) {
    _store.flickrErr = data.msg;
}

var flickrLiveStore = objectAssign({}, EventEmitter.prototype, {
    addFlickrListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeFlickrListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },

    addRestoreLiveListener: function(cb) {
        this.on(RESTORE_EVENT, cb);
    },
    removeRestoreLiveListener: function(cb) {
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
        case appConstants.FLICKR_URL:
            storeUrls(action.data);
            flickrLiveStore.emit(CHANGE_EVENT);
            break;

        case appConstants.FLICKR_URL_ERR:
            saveErr(action.data);
            break;

        case appConstants.FLICKR_RESTORE_LIVE_EVENT:
            flickrLiveStore.emit(RESTORE_EVENT);
            flickrLiveStore.emit(AUTOPLAY_STOP_EVENT);

            break;

        case appConstants.FLICKR_AUTOPLAY_STOP_EVENT:
            console.log('stop event');
            flickrLiveStore.emit(AUTOPLAY_STOP_EVENT);
            break;

        default:
            return true;
    }
});

module.exports = flickrLiveStore;