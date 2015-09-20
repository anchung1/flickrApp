var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var restUrl = "https://localhost:3001/";
var flickrActions = {

    flickrFetchAction: function() {
        console.log('flickr fetch action');
        var flickrUrl = restUrl + 'api/' + 'flickr';
        $.get(flickrUrl).then(
            function(data) {
                console.log(data);
                AppDispatcher.handleAction({
                    actionType: appConstants.FLICKR_URL,
                    data: data.urls
                });
            },
            function(data) {
                AppDispatcher.handleAction({
                    actionType: appConstants.FLICKR_URL_ERR,
                    data: data
                });
                //console.log('errored');
            }
        ).always(
            function() {
                //console.log('always fired');
            }
        );  //lib does not support finally
    }
};

module.exports = flickrActions;