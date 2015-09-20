var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
    result: false
};

var loginStatus = function(result){
    console.log('loginStatus result: ' + result);
    _store.result = result;
};



var loginStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getLogin: function(){
        return _store.result;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.LOGIN_EVENT:
            loginStatus(action.data.result);
            loginStore.emit(CHANGE_EVENT);
            break;

        default:
            return true;
    }
});

module.exports = loginStore;