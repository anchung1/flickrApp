var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;


var CHANGE_EVENT = "changeEvent";

var keepAliveStore = objectAssign({}, EventEmitter.prototype, {

    addKAListener: function(cb) {

        this.on(CHANGE_EVENT, cb);
    },
    removeKAListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }


});



AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){

        case appConstants.KEEPALIVE_EVENT:
            keepAliveStore.emit(CHANGE_EVENT);
            break;

        default:
            return true;
    }
});

module.exports = keepAliveStore;