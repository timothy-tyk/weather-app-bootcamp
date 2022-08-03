import React from "react";
import logo from "./logo.png";
import "./App.css";
import Weather from "./Weather";
import Forecast from "./Forecast";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { city: "" };
  }
  componentDidUpdate(prevState) {
    if (this.state.city !== prevState.city) {
      this.inputCityName();
    }
  }
  inputCityName = (city) => {
    this.setState({ city: city });
    console.log(city);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br />

          <Weather handleSubmit={this.inputCityName} city={this.state.city} />
          <Forecast />
        </header>
      </div>
    );
  }
}

export default App;
