var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'changeEvent';
var CREATE_CHANGE_EVENT = 'createChangeEvent';

var _store = {
    loginResult: false,
    createResult: false
};

var loginStatus = function(result){
    _store.loginResult = result;
};

var createStatus = function(result){
    _store.createResult = result;
};


var loginStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getLogin: function(){
        return _store.loginResult;
    },

    addCreateChangeListener: function(cb){
        this.on(CREATE_CHANGE_EVENT, cb);
    },
    removeCreateChangeListener: function(cb){
        this.removeListener(CREATE_CHANGE_EVENT, cb);
    },
    getCreateStatus: function(){
        return _store.createResult;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.LOGIN_EVENT:
            loginStatus(action.data.result);
            loginStore.emit(CHANGE_EVENT);
            break;

        case appConstants.ACCT_CREATE_EVENT:
            createStatus(action.data.result);
            loginStore.emit(CREATE_CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = loginStore;