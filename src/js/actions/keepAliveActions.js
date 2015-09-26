var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');


var keepAliveActions = {

    keepAlive: function() {
        AppDispatcher.handleAction({
            actionType: appConstants.KEEPALIVE_EVENT,
            data: {}
        })
    }
};

module.exports = keepAliveActions;