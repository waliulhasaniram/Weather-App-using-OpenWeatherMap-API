import './App.css';
import axios from 'axios'
import { LuSunDim } from "react-icons/lu";
import { FaSkyatlas } from "react-icons/fa";
import { useEffect, useState } from 'react';
function App() {
  const [temperature, setTemp] = useState('');
  console.log(temperature.main?.temp)
  
  const date = new Date()
  const weekday = new Array(7)
  weekday[0] = 'sunday';
  weekday[1] = 'monday';
  weekday[2] = 'tuesday';
  weekday[3] = 'wednesday';
  weekday[4] = 'thursday';
  weekday[5] = 'friday';
  weekday[6] = 'saturday';

  const API = process.env.REACT_APP_API_ROOT;

  const getWeatherAPI =async(url)=>{
    try {
      const res = await axios.get(url)
      const weather_data = await res.data;
      setTemp(weather_data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getWeatherAPI(API)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <div className="container">
            <div className='weather'>
                <LuSunDim className='weather_icon'/>
            </div>
            <div className='wave'>
                <div className='weather_info'>
                    <h2><FaSkyatlas /> BD | {date.toLocaleString('en-BD', { hour: 'numeric', minute: 'numeric', hour12: true })}</h2>
                    <p>{weekday[date.getDay()]}, {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()} </p>
                    
                    <h2>Temp: {Math.floor(temperature.main?.temp - 273.15)}
                      <sup>o</sup>C
                    </h2>
                    <div className='smalltext'>
                        <h3>Min_temp: {Math.floor(temperature.main?.temp_min - 273.15)}</h3>
                        <h3>Max_temp: {Math.floor(temperature.main?.temp_max - 273.15)}</h3>
                        <h3>Humidity: {temperature.main?.humidity}%</h3>
                        <h3>Wind: {temperature.wind?.speed}km/s</h3>
                        
                    </div>

                </div>
                <div className='wave1'></div>
                <div className='wave2'></div>
            </div>
        </div>
      </header>
    </div>
  );
}

export default App;
