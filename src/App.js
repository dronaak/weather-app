import './App.css';
import NavBar from './components/NavBar';
import ForecastCard from './components/ForecastCard';
import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");

  const getLocation = (target) => {
    setCity(target);
  }

  return (
    <div className="App">
      <NavBar callBack={getLocation}/>
      <ForecastCard location={city}/>
    </div>
  );
}

export default App;

