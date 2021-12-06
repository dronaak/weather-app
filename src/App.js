import './App.css';
import NavBar from './components/NavBar';
import ForecastCard from './components/ForecastCard';
import React, { useEffect,useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  //const [latitude,setLatitude] = useState(false);
  //const [longitude,setLongitude] = useState(false);

  const getLocation = (target) => {
    setCity(target);
  }

  useEffect(() => {
      //Runs on the first render
      const getGeoLocation = (pos)=>{
        var crd = pos.coords;
        //setLatitude(crd.latitude);
        //setLongitude(crd.longitude);
      }
    
      navigator.geolocation.getCurrentPosition(getGeoLocation);
      //And any time any dependency value changes
  }, []);

  

  return (
    <div className="App">
      <NavBar callBack={getLocation}/>
      <ForecastCard location={city} lat="false" lon="false"/>
    </div>
  );
}

export default App;

