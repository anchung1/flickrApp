var React = require('react');

var Login = React.createClass({

    getInitialState: function () {
        return {
            imageIndex: 0
        };
    },

    render: function() {

        console.log('flickr render');
        console.log('image render: ' + this.props.image);

        var imageItem = <li className="list-group-image"><img src={this.props.image} /></li>;
        /*if (this.props.images.length > 0) {
            var imageItem = <li className="list-group-image"><img src={image} /></li>

            var imageItems = this.props.images.map(function(item, i) {
                console.log(item);
                var id = "li" + i;

                return (
                    <li className="list-group-item" key={id}><img src={item} key={i}/></li>
                );
            });
        }*/
        //<img src="https://farm1.staticflickr.com/778/21513186802_951f457faa.jpg" />
/*
        */
        return (
            <div>
                <ul className="list-group">
                    {imageItem}
                </ul>
            </div>
        );
    }


});

module.exports = Login;