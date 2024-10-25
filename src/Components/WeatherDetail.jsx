import {useParams} from "react-router-dom";
import React from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const WeatherDetail = () => {

    let params = useParams();
    const [data, setDataList] = useState({});
    const [units, setUnits] = useState('imperial');
    const [timezone, setTimezone] = useState(0);
    const [found, setFound] = useState(false);
    const [currentDetails, setCurrentDetails] = useState({});


    useEffect(() => {
        // Fetch data from API
    
        const fetchData = async () => { 
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${params.city}&appid=${API_KEY}&units=${units}`);
          const data = await response.json();
          setDataList(data.list);
          console.log(data);
          setTimezone(data.city.timezone);

          // Find the object with the matching .dt
          const detail = data.list.find(item => item.dt === parseInt(params.dt));
          if (detail) {
            setCurrentDetails(detail);
            setFound(true);
            console.log(detail);
          } else {
            setFound(false);
          }

        }
    
        fetchData().catch(console.error);
      }
      , []); 

    return (
        <div>
            <h1>Weather Detail</h1>


            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">
                        {found ? new Date((currentDetails.dt + timezone) * 1000).toUTCString() : "Loading details..."}
                    </div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button aria-label="Maximize" />
                        <Link to="/"><button aria-label="Close" /></Link>
                    </div>
                </div>

                <div className="window-body">

                    {found ?
                        <div>
                            <p>Weather: {currentDetails.weather[0].main}</p>
                            <img src={`https://openweathermap.org/img/wn/${currentDetails.weather[0].icon}@2x.png`} />
                            <p>Temperature: {currentDetails.main.temp}°F</p>
                            <p>Humidity: {currentDetails.main.humidity}%</p>
                            <p>Feels Like: {currentDetails.main.feels_like}°F</p>
                            <p>Max Temp: {currentDetails.main.temp_max}°F</p>
                            <p>Min Temp: {currentDetails.main.temp_min}°F</p>
                            <p>Wind Speed: {currentDetails.wind.speed} mph</p>
                            <p>Wind Direction: {currentDetails.wind.deg}°</p>
                            <p>Pressure: {currentDetails.main.pressure} hPa</p>
                            <p>Cloudiness: {currentDetails.clouds.all}%</p>
                            <p>Visibility: {currentDetails.visibility} meters</p>
                        </div>
                        :
                        <p>No details found.</p>
                    }
                </div>
            </div>

        </div>
    );
}

export default WeatherDetail;