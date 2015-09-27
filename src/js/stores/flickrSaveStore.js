var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_SAVE_EVENT = "changeSaveEvent";
var CHANGE_LOAD_EVENT = "changeLoadEvent";
var AUTOPLAY_STOP_EVENT = 'autoplayStopEvent';

var _store = {
    flickrMsg: {},
    flickrUrls: []
};

function saveMsg(data) {
    _store.flickrMsg = data;
}
function saveUrls(data) {
    _store.flickrUrls = data;
}

var flickrSaveStore = objectAssign({}, EventEmitter.prototype, {


    addSaveListener: function(cb) {
        this.on(CHANGE_SAVE_EVENT, cb);
    },
    removeSaveListener: function(cb) {
        this.removeListener(CHANGE_SAVE_EVENT, cb);
    },

    addLoadListener: function(cb) {
        this.on(CHANGE_LOAD_EVENT, cb);
    },
    removeLoadListener: function(cb) {
        this.removeListener(CHANGE_LOAD_EVENT, cb);
    },

    addAutoPlayStopListener: function(cb) {
        this.on(AUTOPLAY_STOP_EVENT, cb);
    },
    removeAutoPlayStopListener: function(cb) {
        this.removeListener(AUTOPLAY_STOP_EVENT, cb);
    },

    getMsg: function() {
        return _store.flickrMsg;
    },
    getUrls: function() {
        return _store.flickrUrls;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){

        case appConstants.FLICKR_SAVE_EVENT:
            saveMsg(action.data);
            flickrSaveStore.emit(CHANGE_SAVE_EVENT);
            break;

        case appConstants.FLICKR_LOAD_EVENT:
            saveUrls(action.data);
            flickrSaveStore.emit(CHANGE_LOAD_EVENT);
            flickrSaveStore.emit(AUTOPLAY_STOP_EVENT);

            break;


        default:
            return true;
    }
});

module.exports = flickrSaveStore;