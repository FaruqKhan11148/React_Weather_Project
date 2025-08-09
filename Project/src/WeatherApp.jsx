import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";


export default function WeatherApp(){
    const[weatherInfo, setWeatherInfo]= useState({
            city: "Delhi",
            feels_like:24.84,
            temp:25.05,
            minTemp:25.05,
            maxTemp:25.05,
            humidity:47,
            weather:"haze",
            country:"India"
    });

    let updateinfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }

    return(
        <>
        <div style={{textAlign:"center"}}>
            <h1>Check-Weather</h1>
            <SearchBox updateInfo={updateinfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
        </>
    )
}