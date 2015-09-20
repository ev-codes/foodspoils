var isNode = typeof module !== 'undefined' && module.exports
, React = isNode ? require('react/addons') : window.React;


var HelloMessage = React.createClass({
  handleClick: function (e) {
    console.log("in handle click");
      console.log(e);
      var pins_state = [];
      var long = e.latlng.lng;
      var lat = e.latlng.lat;
      console.log("long" + long);
      console.log("lat" + lat);


      var object ={
	  lat: lat,
	  long: long
      };
      
      pins_state.push(object);
      var marker = L.marker([lat, long]).addTo(this.state.map);


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

      // $.get("/entries", function(result) {
      //   if (this.isMounted()) {
      //     for (var entry in result) {
      //       L.marker([entry[latitude], entry[longitude]]).addTo(map);
      //     }
      //   }
      // }.bind(this));
    },
    getInitialState: function() {
      return {
        lattitude: 45.5017,
        longitude: 73.5673,
        pins: []
      };
    },
    render: function() {
      return (
      <div className="helloMessage">
        Hello {this.props.name}
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">FoodSpoils</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Report <span className="caret"></span></a>
                  <ul className="dropdown-menu" id="report">
                    <li><a href="#">Location</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid" id="map_container">
          <div id="map"></div>
        </div>
      </div>
    );
    }
  });



  if (isNode) {
    exports.HelloMessage = HelloMessage;
  } else {
    React.render(<HelloMessage name="John" />, document.getElementById('react-root'));
  }


  var Report = React.createClass({
    render: function() {
      return (
      <div className="report">
        <form method="post" action="/">
          <h2>Place: </h2>
          <GetLocation />
          <h2>Recoverable?</h2>
          <input type="checkbox"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
    }
  });

  var autocomplete;

  var GetLocation = React.createClass({
    render: function() {
      initAutocomplete();
      return (
        <div className="getLocation">
          <img src="../static/search"/>
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
