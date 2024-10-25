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

            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">
                        {found ? 
                        <>
                            {params.city} - {new Date((currentDetails.dt + timezone) * 1000).toUTCString()}
                        </>
                        : 
                        "Loading details..."}
                    </div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button aria-label="Maximize" />
                        <Link to="/"><button aria-label="Close" /></Link>
                    </div>
                </div>

                <div className="window-body" style={{ padding: '20px', backgroundColor: '#f4f4f4', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
                    {found ? (
                        <div>
                            <div style={{ display: 'inline-block', backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
                                <p><strong>Weather:</strong> {currentDetails.weather[0].main}</p>
                                <img src={`https://openweathermap.org/img/wn/${currentDetails.weather[0].icon}@2x.png`} alt="Weather Icon" />
                            </div>
                            <p><strong>Temperature:</strong> {currentDetails.main.temp}°F</p>
                            <p><strong>Humidity:</strong> {currentDetails.main.humidity}%</p>
                            <p><strong>Feels Like:</strong> {currentDetails.main.feels_like}°F</p>
                            <p><strong>Max Temp:</strong> {currentDetails.main.temp_max}°F</p>
                            <p><strong>Min Temp:</strong> {currentDetails.main.temp_min}°F</p>
                            <p><strong>Wind Speed:</strong> {currentDetails.wind.speed} mph</p>
                            <p><strong>Wind Direction:</strong> {currentDetails.wind.deg}°</p>
                            <p><strong>Pressure:</strong> {currentDetails.main.pressure} hPa</p>
                            <p><strong>Cloudiness:</strong> {currentDetails.clouds.all}%</p>
                            <p><strong>Visibility:</strong> {currentDetails.visibility} meters</p>
                        </div>
                    ) : (
                        <p>No details found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WeatherDetail;