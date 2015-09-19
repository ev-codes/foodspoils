var isNode = typeof module !== 'undefined' && module.exports
, React = isNode ? require('react/addons') : window.React;

var HelloMessage = React.createClass({
    handleClick: function (e) {
	console.log("in handle click");
	console.log(e);
	var pins_state = [];
	var long = e.latlng.lng;
	var lat = e.latlng.lat;

	pins_state = this.state.pins;
	console.log(pins_state);
	var object ={lat: lat,
		     long: long};
	pins_state.push(object);

	
	this.setState({pins: pins_state});
  },
    componentDidMount: function(){
	var map  = L.map('map').setView([45.5017, -73.5673], 13);
	this.setState({map: map});
	console.log("helloworld");
	var that = this;
	map.on('click', function(e) {
	    {
	     that.handleClick(e);
	    };
});


	
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);
    console.log("hello");
  },
  getInitialState: function() {
      return {
	  lattitude: 45.5017,
	  longitude: 73.5673,
	  pins: []
	   };
    },
    render: function() {
      return <div>
      Hello {this.props.name}
      <div className="container-fluid" id="map_container">
	    <div id="map"></div>
      </div>
      </div>
    }
});



  if (isNode) {
      exports.HelloMessage = HelloMessage;
  } else {
      React.render(<HelloMessage name="John" />, document.getElementById('react-root'));
  }
