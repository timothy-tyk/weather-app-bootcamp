import axios from "axios";
import React from "react";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      latitude: 0,
      longitude: 0,
      weatherInfo: false,
      weather: "",
      description: "",
      temp: 0,
      tempFeelsLike: 0,
      tempMin: 0,
      tempMax: 0,
      humidity: 0,
      windSpeed: 0,
      windDeg: 0,
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
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city}&limit=5&appid=${process.env.REACT_APP_WEATHER_API}`
      )
      .then((geoData) =>
        this.setState({
          latitude: geoData.data[0].lat,
          longitude: geoData.data[0].lon,
        })
      )
      .then(() =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${process.env.REACT_APP_WEATHER_API}`
        )
      )
      .then((cityData) => {
        console.log(cityData);
        console.log(cityData.data);
        const { weather, main, wind } = cityData.data;
        this.setState({
          weather: weather[0].main,
          description: weather[0].description,
          temp: main.temp,
          tempFeelsLike: main.feels_like,
          tempMin: main.temp_min,
          tempMax: main.temp_max,
          humidity: main.humidity,
          windSpeed: wind.speed,
          windDeg: wind.deg,
        });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={() => this.props.handleSubmit(this.state.city)}>
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
            <p>
              Weather: {this.state.weather}, {this.state.description}
            </p>
            <p>
              Temperature: {this.state.temp}F | Min: {this.state.tempMin}F |
              Max:{this.state.tempMax}F
            </p>
            <p>
              Humidity: {this.state.humidity} | Wind Speed:
              {this.state.windSpeed} kmh | Wind Deg: {this.state.windDeg}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}
//for loop to render clusters of data
// array for state
