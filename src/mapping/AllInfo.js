
const getTimeString = (timeStamp,timeZone)=>{
   var time = new Date(timeStamp*1000).toLocaleTimeString("en-US", {timeZone: timeZone});
   var temp = time;
   return time.slice(0,4)+' '+temp.slice(8).toLowerCase();
}

const getDay = (timeStamp,timeZone)=>{
    let sDate = new Date(timeStamp*1000).toLocaleDateString("en-US", {timeZone: timeZone});
    let date = new Date(sDate).getDate();
    let month = new Date(sDate).getMonth();
    switch (new Date(sDate).getDay()) {
        case 0:
            return `Sun ${month}/${date}`;
        case 1:
            return `Mon ${month}/${date}`;
        case 2:
            return `Tue ${month}/${date}`;
        case 3:
            return `Wed ${month}/${date}`;
        case 4:
            return `Thu ${month}/${date}`;
        case 5:
            return `Fri ${month}/${date}`;
        case 6:
            return `Sat ${month}/${date}`;
        default:
            break;
    }
}
const mapRequiredData = (oData,timeZone)=>{
    return {
        dt: oData.dt, // timestamp in UTC
        time: getTimeString(oData.dt),
        feelsLike: oData.feels_like,
        humidity: oData.humidity,
        pressure: oData.pressure,
        sunrise: getTimeString(oData.sunrise),
        sunset: getTimeString(oData.sunset),
        temperature: Math.round(oData.temp),
        visibility: oData.visibility,
        windSpeed: oData.wind_speed,
        description: oData.weather[0].description,
        icon: "http://openweathermap.org/img/wn/" +`${oData.weather[0].icon}` + ".png"
    }
}

const hourlyInfo = (aData,timeZone) =>{
    let aHourlyInfo = [];
    aData.forEach((oData)=>{
        aHourlyInfo.push({
            dt: oData.dt, // timestamp in UTC
            feelsLike: oData.feels_like,
            humidity: oData.humidity,
            pressure: oData.pressure,
            temperature: Math.round(oData.temp),
            visibility: oData.visibility,
            windSpeed: oData.wind_speed,
            description: oData.weather[0].description,
            icon: "http://openweathermap.org/img/wn/" +`${oData.weather[0].icon}` + ".png",
        })
    })
    return aHourlyInfo;
}

const dailyInfo = (aData,timeZone)=>{
    let aDailyInfo = [];

    aData.forEach((oData)=>{
        aDailyInfo.push({
            dt: oData.dt, // timestamp in UTC
            day: getDay(oData.dt,timeZone),
            humidity: oData.humidity,
            pressure: oData.pressure,
            maxTemp: Math.round(oData.temp.max),
            minTemp: Math.round(oData.temp.min),
            windSpeed: oData.wind_speed,
            sunrise: oData.sunrise,
            sunset: oData.sunset,
            description: oData.weather[0].description,
            icon: "http://openweathermap.org/img/wn/" +`${oData.weather[0].icon}` + ".png",
        })
    })

    return aDailyInfo;
}

const ForecastInfo = (oData)=>{
    return{
        current: mapRequiredData(oData.current,oData.timezone),
        daily: dailyInfo(oData.daily,oData.timezone),
        hour: hourlyInfo(oData.hourly,oData.timezone),
        timezone: oData.timezone
    }
}

export default ForecastInfo;