import React, { useState, useEffect } from "react";
import ForecastInfo from '../hooks/GetForecastInfo.js';
import '../styles/ForecastCard.css';
import { ReactComponent as HighIcon } from '../assets/high-icon.svg';
import { ReactComponent as HumidityIcon } from '../assets/humidity-icon.svg';
import { ReactComponent as LowIcon } from '../assets/low-icon.svg';
import { ReactComponent as PressureIcon } from '../assets/pressure-icon.svg';
import { ReactComponent as WindIcon } from '../assets/wind-icon.svg';

export default (props) => {
  const[error, setError] = useState(null);
  const[isLoaded, setIsLoaded] = useState(false);
  const[info,setInfo] = useState({});

  useEffect(() => { 

    if (!props.location) {
      setError(null);
      setIsLoaded(false);
      return;
    }
    
    const apiKey = "e2d8fad26c0d32a8458b03ece38bb876";
    const URLOne = `http://api.openweathermap.org/data/2.5/weather?q=${props.location}&APPID=${apiKey}&units=metric&type=hours`;

    fetch(URLOne)
        .then(res =>res.json())
        .then(
            (result) => {
              if (result.cod === 200) {
                setIsLoaded(true);
                setInfo(ForecastInfo(result));  
                
              } else {
                setIsLoaded(true);
                setError(result);
                setInfo({});
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
    
  }, [props])

  if (error) {
    return <div>{error.message}</div>
  }

  if (!isLoaded) {
    return <div>search for the location</div>
  }

  const CurrentWeather = () => {
    return (
        <div className="container container-fluid text-left CardContainer mt-5">
            <span className="float-left">Current Weather</span>
            <h4>{info.location+","+info.country}</h4>
            <div className="row justify-content-center align-items-center text-center">
                <div className="col-12 col-sm-7 my-3">
                    <div className="row mt-3">
                      <div className="col">
                        <img className="CurrentWeatherIcon" alt={info.description} src={info.iconURL}></img>
                        <strong>{info.description}</strong>
                      </div>
                      <div className="col py-3 temptValue">
                        <strong className="ml-6">{info.temperature}°C</strong>
                      </div>
                    </div>    
                </div>
                <div className="col-12 col-sm-5 mt-4">
                    <h5 className="px-5 ">Feels like  {info.feels_like} °C</h5>
                    <div className="row pt-2">
                      <HighIcon className="col"/>
                      <h6 className="col">High</h6>
                      <h6 className="col">{info.max}°C</h6>
                    </div>

                    <div className="row">
                      <LowIcon className="col"/>
                      <h6 className="col">Low</h6>
                      <span className="col"><strong >{info.min}°C</strong></span>
                    </div>

                    <div className="row py-2">
                      <HumidityIcon className="col"/>
                      <h6 className="col">Humidity</h6>
                      <strong className="col">{info.humidity+" %"}</strong>
                    </div>
                    <div className="row">
                      <WindIcon className="col"/>
                      <p className="col">Wind</p>
                      <strong className="col">{info.wind_speed+" mph"}</strong>
                    </div>
                    <div className="row">
                      <PressureIcon className="col"/>
                      <h6 className="col">Pressure</h6>
                      <strong className="col">{info.pressure}</strong>
                    </div>
                </div>
              </div>
        </div>
    )
  }

  
  return CurrentWeather();
}
