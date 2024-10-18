import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [dataList, setDataList] = useState([]);
  const [totalCities, setTotalCities] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);

  const handleSearch = () => {

  }

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=${API_KEY}&include=minutely`);
      const data = await response.json();
      setDataList(data);
      console.log(data);
    }

    fetchData().catch(console.error);
  }
  , []);

  return (
    <>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Search by city"
      />
      <div>
        <p>Total Cities Found: </p>
        <p>Mean Temperature: °C</p>
        <p>Max Temperature: °C</p>
      </div>
    </>
  )
}

export default App
