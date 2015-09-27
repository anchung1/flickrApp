var React = require('react');
var flickrLiveStore = require('../stores/flickrLiveStore');
var flickrSaveStore = require('../stores/flickrSaveStore');
var flickrSearchStore = require('../stores/flickrSearchStore');


var timerID;

var AutoPlay = React.createClass({

    getInitialState: function() {

        return {
            sliderVal: 2.5,
            message: ''
        };
    },

    componentDidMount: function () {
        var node = this.refs.slider.getDOMNode();
        node.value = this.state.sliderVal;

        flickrLiveStore.addAutoPlayStopListener(this._autoPlayStop);
        flickrSaveStore.addAutoPlayStopListener(this._autoPlayStop);
        flickrSearchStore.addAutoPlayStopListener(this._autoPlayStop);
    },

    componentWillUnmount: function () {
        flickrLiveStore.removeAutoPlayStopListener(this._autoPlayStop);
        flickrSaveStore.removeAutoPlayStopListener(this._autoPlayStop);
        flickrSearchStore.removeAutoPlayStopListener(this._autoPlayStop);
    },

    _autoPlayStop: function() {
        console.log('autoplay stop');
        this.stopClick();
    },

    doPlay: function(mode) {


        if (timerID && !mode) this.props.handler();
        if (timerID) clearTimeout(timerID);

        var delay = this.state.sliderVal * 1000;
        timerID = setTimeout(this.doPlay, delay);
    },

    sliderEvent: function() {

        var value = this.refs.slider.getDOMNode().value;
        this.setState({
            sliderVal: value
        });

        this.doPlay('preventSlide');
    },

    stopClick: function() {
        this.setState({
            message: 'Stopped'
        });
        if (timerID) clearTimeout(timerID);
    },

    playClick: function() {
        this.setState({
            message: 'Playing'
        });
        this.doPlay();
    },

    render: function() {
        var glyphStopStyle = {
            fontSize: '20px',
            marginRight: '15px',
            color: 'red'
        };

        var glyphPlayStyle = {
            fontSize: '20px',
            color: 'green'
        };

        var msgStyle = {
            position: 'relative',
            top: '-3px'
        };

        var msgElem;
        if (this.state.message=='Stopped') {
            msgElem = <span className="label label-danger col-md-offset-2 col-xs-offset-2 col-sm-offset-2" style={msgStyle}>{this.state.message}</span>

        } else {
            msgElem = <span className="label label-primary col-md-offset-2 col-xs-offset-2 col-sm-offset-2" style={msgStyle}>{this.state.message}</span>

        }

        return (
            <div className='row' style={{'marginLeft': '0', 'marginRight': '0'}}>
                <span className="glyphicon glyphicon-stop" onClick={this.stopClick} style={glyphStopStyle}></span>
                <span className="glyphicon glyphicon-play" onClick={this.playClick} style={glyphPlayStyle}></span>
                {msgElem}
                <span className="pull-right">Play Speed: 1 frame/{this.state.sliderVal} sec</span>
                <input ref='slider' type='range' min='0.5' max='5.0' step='0.5' onChange={this.sliderEvent}/>
            </div>
        );
    }

});

module.exports = AutoPlay;