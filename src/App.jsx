import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import WeatherData from './Components/WeatherData';


function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [dataList, setDataList] = useState([]);
  const [currentCity, setCurrentCity] = useState('');
  const [maxTemp, setMaxTemp] = useState(0);
  const [location, setLocation] = useState('New York');
  const [units, setUnits] = useState('imperial');

  useEffect(() => {
    // Fetch data from API

    const fetchData = async () => { 
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=${units}`);
      const data = await response.json();
      setDataList(data.list);
      setCurrentCity(data.city.name);
      console.log(data);
      //console.log(API_KEY);
    }

    fetchData().catch(console.error);
  }
  , []);

  const handleSearch = () => {
    console.log(searchTerm);
    if (searchTerm === '') {
      alert('Please enter a city name');
      return;
    }
    
    const handleNewLocationSearch = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${API_KEY}&units=${units}`);
        if (!response.ok) {
          if (response.status === 404) {
            alert('City not found. Please enter a valid city name.');
          } else {
            alert('An error occurred. Please try again later.');
          }
          return;
        }
        const data = await response.json();
        setDataList(data.list);
        setCurrentCity(data.city.name);
        //console.log(data);
        console.log("Printing data...");
        console.log(dataList);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again later.');
      }
    }

    handleNewLocationSearch().catch(console.error);

    //console.log(dataList);

  }

  return (
    <>
      <h1>Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter City Name"
        onChange={ (e) => setSearchTerm(e.target.value) }
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <h3>Current City: {currentCity}</h3>
        <h4>Max Temperature: °F | Min Temperature: °F</h4>
      </div>

      <div>

        {dataList.length != 0 ? dataList.map((item, index) => <WeatherData key={index} time={item.dt_txt} weather={item.weather} temperature={item.main.temp}/>) : null}

      </div>

    </>
  )
}

export default App
