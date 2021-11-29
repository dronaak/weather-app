
const ForecastInfo = (data)=>{

    const mapped = {
        location: data.name,
        condition: data.cod,
        country: data.sys.country,
        date:data.dt,
        description: data.weather[0].description,
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure+" hPa",
        icon_id: data.weather[0].id,
        iconURL: "http://openweathermap.org/img/wn/" +`${data.weather[0].icon}` + ".png",
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(`en-${data.sys.country}`),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(`en-${data.sys.country}`),
        temperature: Math.round(data.main.temp),
        timezone: data.timezone / 3600, // convert from seconds to hours
        wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
    };
    console.log(data);
    
    if (data.weather[0].description) {
        mapped.description =
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1);
    }
    
    if (data.main.temp_min && data.main.temp_max) {
        mapped.max = Math.round(data.main.temp_max);
        mapped.min = Math.round(data.main.temp_min);
    }
    
    // remove undefined fields
    Object.entries(mapped).map(
        ([key, value]) => value === undefined && delete mapped[key],
    );
    console.log(mapped);
    
    return mapped;
}

export default ForecastInfo;