import '../styles/DailyInfo.css';

const dailyInfo = (props)=>{

    let itemList=props.dailyInfo.map((item,index)=>{

        return <div key={index}>
            <div className="row">
                <div className="col-2 pt-5">
                   <strong>{item.day}</strong>
                </div>
                <div className="col-2 pt-5">
                    <span className="maxTemp">{item.maxTemp}°c</span>
                    <span>{"  /"+item.minTemp}°c</span>
                </div>
                <div className="col-3">
                    <img className="CurrentWeatherIcon" alt={item.description} src={item.icon}></img>
                </div>
                <div className="col-5 pt-5">
                   <strong>{item.description}</strong>
                </div>
            </div>
        </div>
    })

    return (
       <div className="container bg-white mt-3 pb-2 mb-5 rounded">
           <div className="textLeft pt-3">
                <h4>8 Day Forecast</h4>
           </div>
           {itemList}
       </div>
    )
}

export default dailyInfo;