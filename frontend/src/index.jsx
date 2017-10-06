import React from 'react';
import ReactDOM from 'react-dom';


//====================GETPOS

var getPosition = async function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}


//====================GETPOS

const baseURL = process.env.ENDPOINT;
var weatherReport;

const getWeatherFromApi = async () => {
  try {
    const coords = await getPosition();
    var lat = coords.coords.latitude;
    var lng = coords.coords.longitude;

    const response = await fetch(`${baseURL}/weather?lat=${lat}&lng=${lng}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

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
