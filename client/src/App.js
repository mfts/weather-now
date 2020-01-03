import React, { Component, Fragment } from 'react';
import './App.css';

import ForecastApi from './api/ForecastApi';
import Temperature from './components/Temperature'

class App extends Component {
  constructor(){
    super()
    this.forecastApi = new ForecastApi();
    this.state = {latitude: 0,
                  longitude: 0,
                  weather: "",
                  base_latitude: '37.8267',
                  base_longitude: '-122.4233',
                  dataLoaded: false};
  }

  async fetchForecast() {
    await this.forecastApi.fetch(this.state.base_latitude, this.state.base_longitude);
    this.setState({latitude: this.forecastApi.data.latitude, 
                  longitude: this.forecastApi.data.longitude, 
                  weather: this.forecastApi.data.currently.summary,
                  dataLoaded: true});
  }

  componentDidMount() {
    this.fetchForecast()
  }

  render() {
    return (
      <div className="App">
        {
          !this.state.dataLoaded ? <p>Loading...</p> : <Fragment>
            <Temperature weather={this.state.weather} />
          </Fragment>
        }
      </div>
    );
  }
}

export default App;
