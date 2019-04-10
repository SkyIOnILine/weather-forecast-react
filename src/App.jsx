import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import './sass/app.scss';
import TopSection from './components/top/top';
import BottomSetion from './components/bottom/bottom';
import axios from 'axios';


const WEATHER_KEY = 'a855901cf84344c798593104190904';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: 'London',
      forecastDays: 3,
      isLoading: true
    }
  }

  updateWeather() {
    const { cityName, forecastDays } = this.state;
    const URL = `https://api.apixu.com/v1/forecast.json?key=${WEATHER_KEY}&q=${cityName}&days=${forecastDays}`;

    axios
      .get(URL)
      .then(res => {
        // console.log('Data: ', res);
        return res.data;
      }).then(data => {
        this.setState({ 
          isLoading: false,
          temp_c: data.current.temp_c, 
          isDay: data.current.is_day, 
          text: data.current.condition.text, 
          iconURL: data.current.condition.icon,
          forecastdays: data.forecast.forecastday
        })
      })
      .catch(err => {
        console.error('Cannot fetch data from api', err);
      });
  }

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on('updateWeather', data => {
      this.setState({ cityName: data }, () => this.updateWeather());
      console.log('LocationName: ', data);
    })
  } 

  render() {
    const { isLoading, cityName, temp_c, isDay, text, iconURL, forecastdays } = this.state;


    return <div className="app-container">
      <div className="main-container">
      {isLoading &&  <h3>Loading page...</h3>}
      {!isLoading &&
        <div className="top-section">
          <TopSection 
            location={cityName} 
            temp_c={temp_c} 
            isDay={isDay} 
            text={text} 
            iconURL={iconURL}
            eventEmitter={this.props.eventEmitter} 
          />
        </div>
      }
        <div className="bottom-section">
          <BottomSetion forecastdays={forecastdays}/>
        </div>
      </div>
    </div>;
  }
}

export default App;
