import React from 'react';
import ReactDOM from 'react-dom';


//==============GOOGLE API==============//
var geocoder;
var kaupunki;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
//Get the latitude and the longitude;
function successFunction(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  codeLatLng(lat, lng)
}

function errorFunction(){
  alert("Geocoder failed");
}

function initialize() {
  geocoder = new google.maps.Geocoder();



}

function codeLatLng(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
    console.log(results)
      if (results[1]) {
       //formatted address
       kaupunki = results[3].address_components[0].long_name;
       process.env.CITY = kaupunki;
       //alert(kaupunki);
       console.log(
         results
       );
      //find country name

      //city data

      } else {
        alert("No results found");
      }
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });
}

const baseURL = process.env.ENDPOINT;

var weatherReport;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};
//==============GOOGLE API==============//


class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      weather: "",
      description: "",
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    this.setState({icon: weather.icon.slice(0, -1)});
    this.setState({description: weather.description});
    this.setState({weather: weather.main});
    console.log(weather);
  }

  render() {
    const { icon } = this.state;
    return (
      <div id="Content">
        { icon && <img id="icon" src={`/img/${icon}.svg`} /> }
        <h3 id="report">
        Weather: { this.state.weather }<br/>
        Weather description: { this.state.description }
        </h3>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
