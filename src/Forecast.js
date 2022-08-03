import axios from "axios";
import React from "react";

export default class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      latitude: 0,
      longitude: 0,
      weatherInfo: false,
      forecasts: [],
      // dateTime: [],
      // weather: [],
      // description: [],
      // temp: [],
      // tempFeelsLike: [],
      // tempMin: [],
      // tempMax: [],
      // humidity: [],
      // windSpeed: [],
      // windDeg: [],
    };
  }
  handleChange = (event) => {
    this.setState({ city: event.target.value });
  };
  handleSubmit = (event) => {
    console.log(this.state.city);
    this.callWeatherAPI();
    this.setState({ weatherInfo: true });
    event.preventDefault();
  };

  callWeatherAPI = () => {
    console.log(this.state.city);
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city}&limit=5&appid=${process.env.REACT_APP_WEATHER_API}`
      )
      .then((geoData) => {
        console.log(geoData.data);
        this.setState({
          latitude: geoData.data[0].lat,
          longitude: geoData.data[0].lon,
        });
        return geoData.data[0];
      })
      .then((info) => {
        console.log(info.lat, info.lon);
        return axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${info.lat}&lon=${info.lon}&appid=${process.env.REACT_APP_WEATHER_API}`
        );
      })
      .then((cityData) => {
        const forecastData = cityData.data.list;
        console.log(forecastData);
        this.setState({ forecasts: forecastData });
      });
  };

  render() {
    const forecastData = this.state.forecasts;
    console.log(forecastData);
    //map through state
    const forecast = forecastData.map((item) => {
      return (
        <div>
          <h4>{item.dt_txt}</h4>
          <p>
            Weather: {item.weather[0].main}, {item.weather[0].description}
          </p>
          <p>
            Temperature: {item.main.temp}F | Min: {item.main.temp_min}F | Max:
            {item.main.temp_max}F
          </p>
          <p>
            Humidity: {item.main.humidity} | Wind Speed: {item.wind.speed} kmh |
            Wind Deg: {item.wind.deg}
          </p>
          <br />
        </div>
      );
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label className="input-label">
            City:{" "}
            <input
              type="text"
              placeholder="Enter City Name"
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </label>
        </form>

        {this.state.weatherInfo ? (
          <div>
            <h4>Current Weather Info</h4>
            <p>
              City: {this.state.city} | Lat: {this.state.latitude} | Long:
              {this.state.longitude}
            </p>
            <br />
            <div>{forecast}</div>
          </div>
        ) : null}
      </div>
    );
  }
}
//for loop to render clusters of data
// array for state
