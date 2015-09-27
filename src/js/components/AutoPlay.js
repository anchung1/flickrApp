var React = require('react');

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
    },

    doPlay: function() {

        if (timerID) this.props.handler();
        if (timerID) clearTimeout(timerID);

        var delay = this.state.sliderVal * 1000;
        timerID = setTimeout(this.doPlay, delay);
    },

    sliderEvent: function() {

        var value = this.refs.slider.getDOMNode().value;
        this.setState({
            sliderVal: value
        });

        this.doPlay();
    },

    stopClick: function() {
        this.setState({
            message: 'Stop'
        });
        if (timerID) clearTimeout(timerID);
    },

    playClick: function() {
        this.setState({
            message: 'Play'
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

        return (
            <div className='row' style={{'marginLeft': '0', 'marginRight': '0'}}>
                <span className="glyphicon glyphicon-stop" onClick={this.stopClick} style={glyphStopStyle}></span>
                <span className="glyphicon glyphicon-play" onClick={this.playClick} style={glyphPlayStyle}></span>
                <span className="label label-info col-md-offset-2" style={msgStyle}>{this.state.message}</span>
                <span className="pull-right">Play Speed: 1 frame/{this.state.sliderVal} sec</span>
                <input ref='slider' type='range' min='0.5' max='5.0' step='0.5' onChange={this.sliderEvent}/>
            </div>
        );
    }

});

module.exports = AutoPlay;