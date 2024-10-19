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
  //I just made default city New York. Can be changed to any valid city.
  const [location, setLocation] = useState('New York');
  const [units, setUnits] = useState('imperial');
  const [weatherFilter, setWeatherFilter] = useState('');
  const [displayData, setDisplayData] = useState([]);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [timezone, setTimezone] = useState(0);


  const calcMaxAndMinTemp = (temps) => {
    if(temps.length === 0) {

      console.log(temps);
      setMaxTemp(0);
      setMinTemp(0);
      return;
    }

    const max = Math.max(...temps);
    setMaxTemp(max);
    const min = Math.min(...temps);
    setMinTemp(min);

      
  }

  useEffect(() => {
    // Fetch data from API

    const fetchData = async () => { 
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=${units}`);
      const data = await response.json();
      setDataList(data.list);
      setDisplayData(data.list);
      setCurrentCity(data.city.name);
      console.log(data);
      //console.log(API_KEY);
      const temps = data.list.map((item) => item.main.temp);
      calcMaxAndMinTemp(temps);
      setTimezone(data.city.timezone);
    }

    fetchData().catch(console.error);
  }
  , []);

  useEffect(() => {
    handleFilter();
  }, [weatherFilter]);

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
        //Clear the filters upon new city search
        handleClearFilters();
        setDataList(data.list);
        setDisplayData(data.list);
        calcMaxAndMinTemp(data.list.map((item) => item.main.temp));
        setCurrentCity(data.city.name);
        setTimezone(data.city.timezone);
        //console.log(data);
        console.log("Printing data...");
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again later.');
      }
    }

    handleNewLocationSearch().catch(console.error);

  }

  /*
  const handleFilterChange = (e) => {
    setWeatherFilter(e.target.value);
    console.log(e.target.value);
    if (e.target.value === 'No Filter Selected') {
      setDisplayData(dataList);
      handleSearchDate();
      calcMaxAndMinTemp(displayData.map((item) => item.main.temp));
    } else {
      handleSearchDate();
      handleFilterData(e.target.value);
    }
  }

  const handleFilterData = (filter) => {

    const filtered = displayData.filter((item) => item.weather[0].main === filter);
    setDisplayData(filtered);

    calcMaxAndMinTemp(filtered.map((item) => item.main.temp));

  }

  const handleSearchDate = () => {
    
    if(searchDate == '') {
      console.log("searchDate empty");
      return;
    }
    console.log("not empty");

    //Note to self: I hate dealing with time. Please never do this again.
    const searchDateUTC = new Date(searchDate).toISOString().split('T')[0];
    const searchTimestamp = new Date(searchDateUTC).getTime() / 1000;
    const filteredData = displayData.filter(item => {
      const itemDate = new Date((item.dt + timezone) * 1000); // Adjust for timezone
      const itemDateUTC = itemDate.toISOString().split('T')[0];
      return itemDateUTC === searchDateUTC;
    }
  );

    setDisplayData(filteredData);
    calcMaxAndMinTemp(filteredData.map((item) => item.main.temp));
  }

  const handleSearchTime = () => {
    const [hours, minutes] = searchTime.split(':').map(Number);
    console.log(`Hours: ${hours}, Minutes: ${minutes}`);
    const filteredData = displayData.filter(item => {
      const itemDate = new Date((item.dt + timezone) * 1000); // Adjust for timezone
      console.log(itemDate);
      const itemTime = itemDate.getUTCHours() * 3600 + itemDate.getUTCMinutes() * 60;
      const searchTimeInSeconds = hours * 3600 + minutes * 60;
      return itemTime === searchTimeInSeconds;
    });
    setDisplayData(filteredData);
    calcMaxAndMinTemp(filteredData.map((item) => item.main.temp));
  };
*/
  const handleClearFilters = () => {
    setWeatherFilter('No Filter Selected');
    setSearchDate('');
    setSearchTime('');
    setDisplayData(dataList);
    calcMaxAndMinTemp(dataList.map((item) => item.main.temp));
  };

  const handleFilter = () => {

    let filteredData = dataList;

    if (weatherFilter !== 'No Filter Selected') {
      console.log("weatherFilter not empty");
      filteredData = filteredData.filter(item => item.weather[0].main === weatherFilter);
    }

    if (searchDate !== '') {
      console.log("searchDate not empty");
      const searchDateUTC = new Date(searchDate).toISOString().split('T')[0];
      filteredData = filteredData.filter(item => {
        const itemDate = new Date((item.dt + timezone) * 1000);
        const itemDateUTC = itemDate.toISOString().split('T')[0];
        return itemDateUTC === searchDateUTC;
      });
    }

    if (searchTime !== '') {
      console.log("searchTime not empty");
      const [hours, minutes] = searchTime.split(':').map(Number);
      const searchTimeInSeconds = hours * 3600 + minutes * 60;
      filteredData = filteredData.filter(item => {
        const itemDate = new Date((item.dt + timezone) * 1000);
        const itemTime = itemDate.getUTCHours() * 3600 + itemDate.getUTCMinutes() * 60;
        return itemTime === searchTimeInSeconds;
      });
    }

    setDisplayData(filteredData);
    calcMaxAndMinTemp(filteredData.map((item) => item.main.temp));

  }

  return (
    <>
      <h1>Weather Forecast</h1>
      <div>
        <h3>Current City: {currentCity}</h3>
        <h4>Results Found: {displayData.length} | Max Temperature: {maxTemp}°F | Min Temperature: {minTemp}°F</h4>
      </div>

      <div className="filters">
        <div>
          <p>Search For City:</p>
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={ (e) => setSearchTerm(e.target.value) }
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div>
          <p>Filter By Time</p>  
          <input type="text" value={searchTime} onChange={ e => setSearchTime(e.target.value)} placeholder="Enter time" />
          <button onClick={handleFilter}>Search</button>
        </div>

        <div>
          <p>Filter by Weather</p>
          <select value ={weatherFilter} onChange={ e => setWeatherFilter(e.target.value)}>
            <option>No Filter Selected</option>
            <option>Clear</option>
            <option>Clouds</option>
            <option>Rain</option>
            <option>Drizzle</option>
            <option>Thunderstorm</option> 
            <option>Snow</option>
          </select>
        </div>

        <div>
          <p>Filter By Date</p>  
          <input type="date" value={searchDate} onChange={ e => setSearchDate(e.target.value)} />
          <button onClick={handleFilter}>Search</button>
        </div>
        
        
      </div>

      <button onClick={handleClearFilters}>Clear</button>
      

      <div>

        {dataList.length != 0 && displayData.length != 0 ? displayData.map((item, index) => <WeatherData key={index} time={item.dt} weather={item.weather} temperature={item.main.temp} timezoneval={timezone}/>) : <p>No Data Found.</p>}
        
      </div>

    </>
  )
}

export default App
