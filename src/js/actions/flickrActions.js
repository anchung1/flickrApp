var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var restUrl = "https://localhost:3001/";

function showMsg(msg, error) {
    AppDispatcher.handleAction({
        actionType: appConstants.FLICKR_SAVE_EVENT,
        data: {msg: msg, error: error}
    });
}

function showLoading() {
    showMsg("Loading..", false);
}

var flickrActions = {

    flickrFetchAction: function(count) {
        //console.log('flickr fetch action');
        var flickrUrl = restUrl + 'api/flickr';
        if (count > 0) {
            flickrUrl += "?count=" + count;
        }

        //showLoading();
        $.get(flickrUrl).then(
            function(data) {
                //console.log(data);
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

    flickrDoSearch: function(count, text, page, event) {
        //console.log('flickr fetch action');
        var flickrUrl = restUrl + 'api/flickrSearch';
        if (count > 0) {
            flickrUrl += "?count=" + count;
        }

        if (!text) {
            AppDispatcher.handleAction({
                actionType: appConstants.FLICKR_SEARCH_ERR_EVENT,
                data: {msg: 'requires tag'}
            });
            return;
        }

        flickrUrl += "&text=" + text;
        if (page) flickrUrl += "&page=" + page;

        //showLoading();
        $.get(flickrUrl).then(
            function(data) {
                //console.log(data);
                AppDispatcher.handleAction({
                    actionType: event,
                    data: {urls: data.urls, search: text}
                });
            },
            function(data) {
                AppDispatcher.handleAction({
                    actionType: appConstants.FLICKR_SEARCH_ERR_EVENT,
                    data: {msg: 'no search result', data: data}
                });
                //console.log('errored');
            }
        ).always(
            function() {
                //console.log('always fired');
            }
        );  //lib does not support finally
    },

    flickrSearchAction: function(count, text, page) {
        this.flickrDoSearch(count, text, page, appConstants.FLICKR_SEARCH_EVENT);
    },

    flickrNewSearchAction: function(count, text, page) {
        this.flickrDoSearch(count, text, page, appConstants.FLICKR_NEW_SEARCH_EVENT);
    },

    saveImage: function(url) {
        //console.log('save image ' + url);

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
                showMsg(msg, error);

            }
        );

    },

    saveImageMsgClear: function() {
        showMsg();
        /*AppDispatcher.handleAction({
            actionType: appConstants.FLICKR_SAVE_EVENT,
            data: {}
        })*/
    },

    loadSavedImages: function() {
        //console.log('fetch image ');

        var flickrUrl = restUrl + 'api/flickrSaved';
        //showLoading();

        $.get(flickrUrl).then(
            function(data) {

                AppDispatcher.handleAction({
                    actionType: appConstants.FLICKR_LOAD_EVENT,
                    data: data.urls
                });
                /*console.log('fetched: ');
                console.log(data);*/
            },
            function(data) {
                /*console.log('fetch failed: ');
                console.log(data);*/
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
    },
    loadSearchImages: function() {
        AppDispatcher.handleAction({
            actionType: appConstants.FLICKR_RESTORE_SEARCH_EVENT,
            data: {}
        })
    },

    autoPlayStop: function() {
        AppDispatcher.handleAction({
            actionType: appConstants.FLICKR_AUTOPLAY_STOP_EVENT,
            data: {}
        })
    }
};

module.exports = flickrActions;