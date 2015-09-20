var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var restUrl = "https://localhost:3001/";

var loginActions = {
    login: function(data){
        //console.log('login action');
        var loginUrl = restUrl + 'users/' + 'login';
        var success = false;
        $.post(loginUrl, {name: data.user, password: data.pw}).then(
            function() {
                success = true;
            },
            function() {
                success = false;
            }
        ).always(
            function() {
                AppDispatcher.handleAction({
                    actionType: appConstants.LOGIN_EVENT,
                    data: {result: success}
                });
            }
        );
    }

};

module.exports = loginActions;