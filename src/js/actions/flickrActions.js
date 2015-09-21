var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var restUrl = "https://localhost:3001/";
var flickrActions = {

    flickrFetchAction: function(count) {
        //console.log('flickr fetch action');
        var flickrUrl = restUrl + 'api/flickr';
        if (count > 0) {
            flickrUrl += "?count=" + count;
        }
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
    },

    saveImage: function(url) {
        console.log('save image ' + url);

        var flickrUrl = restUrl + 'api/flickrSave';
        var msg = "";
        var error = false;
        $.post(flickrUrl, {image: url}).then(
            function() {
                msg = "Image saved.";
            },
            function(data) {
                error = true;
                msg = "Save error: " + data.status + " " + data.statusText;
            }
        ).always(
            function() {
                AppDispatcher.handleAction({
                    actionType: appConstants.FLICKR_SAVE_EVENT,
                    data: {msg: msg, error: error}
                });
            }
        );

    },

    saveImageMsgClear: function() {
        AppDispatcher.handleAction({
            actionType: appConstants.FLICKR_SAVE_EVENT,
            data: {}
        })
    },

    loadSavedImages: function() {
        console.log('fetch image ');

        var flickrUrl = restUrl + 'api/flickrSaved';
        $.get(flickrUrl).then(
            function(data) {

                AppDispatcher.handleAction({
                    actionType: appConstants.FLICKR_SAVED_IMAGES_EVENT,
                    data: data.urls
                });
                console.log('fetched: ');
                console.log(data);
            },
            function(data) {
                console.log('fetch failed: ');
                console.log(data);
            }
        ).always(
            function() {
            }
        );

    },

    loadLiveImages: function() {
        AppDispatcher.handleAction({
            actionType: appConstants.FLICKR_RESTORE_LIVE_EVENT,
            data: {}
        })
    }
};

module.exports = flickrActions;