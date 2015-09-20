var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
    flickrUrls: [],
    flickrErr: {}
};

function storeUrls(data) {
    _store.flickrUrls = data;
}

function saveErr(data) {
    _store.flickrErr = data;
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
        default:
            return true;
    }
});

module.exports = flickrStore;