var isNode = typeof module !== 'undefined' && module.exports
, React = isNode ? require('react/addons') : window.React;

var HelloMessage = React.createClass({
  handleClick: function () {
      alert('You clicked!');
  },
  componentDidMount: function(){
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);
    console.log("hello");
  },
  getInitialState: function() {
    return {lattitude: 45.5017,
      longitude: 73.5673};
    },
    render: function() {
      return <div onClick={this.handleClick}>
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
