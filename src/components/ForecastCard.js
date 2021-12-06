import React, { useState, useEffect } from "react";
import ForecastInfo from '../mapping/AllInfo.js';
import '../styles/ForecastCard.css';
import DailyInfo from './DailyInfo';

export default (props) => {
  const[error, setError] = useState(null);
  const[isLoaded, setIsLoaded] = useState(false);
  const[country,setCountry] = useState();
  const[city,setCity] = useState();
  const[current,setCurrent] = useState({});
  const[daily,setDaily] = useState([]);
  const[hourly,setHourly] = useState([]);

  useEffect(() => { 

    if (!props.location && !props.lat && !props.lon) {
      setError(null);
      setIsLoaded(false);
      return;
    }
    
    const apiKey = "e2d8fad26c0d32a8458b03ece38bb876";
    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${props.location}&limit=1&appid=${apiKey}`;
    //const URLOne = `http://api.openweathermap.org/data/2.5/weather?q=${props.location}&APPID=${apiKey}&units=metric&type=hours`;

    const getWeatherInfo = (lat,long,apiKey) => {
      const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
      fetch(forecastURL)
      .then(res =>res.json())
      .then(
        (result) => {
          if (result) {
            setIsLoaded(true);
            setError(null);
            let weatherInfo = ForecastInfo(result);
            setCurrent(weatherInfo.current);
            setDaily(weatherInfo.daily);
            setHourly(weatherInfo.hour);
            console.log(result);
          }
        },
        (error)=>{
          setIsLoaded(true);
          setError(error);
        }
      ).catch((error)=>{
        setIsLoaded(true);
        setError(error);
      })
    }

    if ( !props.lat && !props.lon) {
      fetch(geoURL)
        .then(res =>res.json())
        .then(
            (result) => {
              if (result) {
                setIsLoaded(true);
                setError(null);
                setCountry(result[0].country);
                setCity(result[0].name);
                console.log(result);
                getWeatherInfo(result[0].lat,result[0].lon,apiKey);
              }
            },
            (error)=>{
              setIsLoaded(true);
              setError(error);
            }
        ).catch((error)=>{
          setIsLoaded(true);
          setError(error);
        })  
    } else {
      getWeatherInfo(props.lat,props.lon,apiKey);
    }
    
  }, [props])

  

  if (error) {
    return <div className="container bg-white my-5 rounded">
      <strong className="my-5">{error.message}</strong>
    </div>
  }

  if (!isLoaded) {
    return <div className="container bg-white my-5 rounded">
      <strong className="my-5">search for a location</strong>
    </div>
  }

  const CurrentWeather = () => {
    return (
      <div>
        <div className="container bg-white mt-3 pb-2 rounded">
          <div className="headerTitle pt-3 ">
            <h5>Weather Today in {city+", "+country}</h5>
          </div>
          <div className="row pb-4">
            <div className="col headerTitle">
              <div className="temptValue pt-3">{current.temperature}°c</div>
              <div className="feelsLike">Feels Like</div>
            </div>
            <div className="col">
              <img className="CurrentWeatherIcon" alt={current.description} src={current.icon}></img>
            </div>
          </div>
          <div className="row">
            <div className="col px-4">
              <div className="row listItem py-2">
                <div className="col">Humidity</div>
                <div className="col">{current.humidity} %</div>
              </div>
            </div>
            <div className="col px-4">
              <div className="row listItem py-2">
                <div className="col">Wind</div>
                <div className="col">{current.windSpeed} m/s</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col px-4">
              <div className="row listItem py-2">
                <div className="col">Pressure</div>
                <div className="col">{current.pressure} hPa</div>
              </div>
            </div>
            <div className="col px-4">
              <div className="row listItem py-2">
                <div className="col">Visibility</div>
                <div className="col">{current.visibility} mt</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col px-4">
              <div className="row listItem py-2">
                <div className="col">Sunrise</div>
                <div className="col">{current.sunrise}</div>
              </div>
            </div>
            <div className="col px-4">
              <div className="row listItem py-2">
                <div className="col">Sunset</div>
                <div className="col">{current.sunset}</div>
              </div>
            </div>
          </div>
        </div>
        <DailyInfo dailyInfo={daily}/>
      </div>
        
    )
  }

  
  return CurrentWeather();
}
