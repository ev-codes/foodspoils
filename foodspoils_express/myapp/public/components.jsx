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


var Report = React.createClass({
  render: function() {
    <div className="report">
      <form method="post" action="/">
        <h2>Place: </h2>
        <GetLocation />
        <h2>Recoverable?</h2>
        <input type="checkbox"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  }
});

var autocomplete;

var GetLocation = React.createClass({
  render: function() {
    initAutocomplete();
    return (
      <div className="getLocation">
        <img src="../static/search">
        <input id="autocomplete" placeholder="Enter your address" type="text"></input>
        <input id="latitude" type="hidden" name="latitude"></input>
        <input id="longitude" type="hidden" name="longitude"></input>
      </div>
    );
  }
});


function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
     (document.getElementById('autocomplete')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', getLocationFromAutocomplete);
}

function getLocationFromAutocomplete() {
  var place = autocomplete.getPlace();

  document.getElementById('latitude').value = place.geometry.latitude;
  document.getElementById('longitude').value = place.geometry.longitude;
}
