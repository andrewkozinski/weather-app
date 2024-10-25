import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import WeatherData from './Components/WeatherData';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Window from './Components/Window';


function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [dataList, setDataList] = useState([]);
  const [currentCity, setCurrentCity] = useState('');
  //I just made default city New York. Can be changed to any valid city.
  const [location, setLocation] = useState('New York');
  const [units, setUnits] = useState('imperial'); //set Units is never used but metric units toggle can be implemented pretty easily.
  const [weatherFilter, setWeatherFilter] = useState('No Filter Selected');
  const [displayData, setDisplayData] = useState([]);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [timezone, setTimezone] = useState(0);
  //const [filteredData, setFilteredData] = useState(dataList);
  const [chartData, setChartData] = useState({});


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

  useEffect(() => {

    // Prepare data for the chart
    const data = displayData;
    const chartLabels = data.map(item => new Date((item.dt + timezone) * 1000).toLocaleString());
    const chartValues = data.map(item => item.main.temp);

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: 'Temperature Over Time',
          data: chartValues,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });

  }, [displayData]);

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
      console.log(weatherFilter);
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
      
      {dataList.length === 0 ? <p>Loading...</p> : 
        <Window 
        currentCity={currentCity}
        displayData={displayData}
        maxTemp={maxTemp}
        minTemp={minTemp}
        chartData={chartData}
        handleSearch={handleSearch}
        setSearchTerm={setSearchTerm}
        searchTime={searchTime}
        setSearchTime={setSearchTime}
        setWeatherFilter={setWeatherFilter}
        weatherFilter={weatherFilter}
        handleFilter={handleFilter}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
        handleClearFilters={handleClearFilters}
        />
      }

      <div>

        {dataList.length != 0 && displayData.length != 0 ? displayData.map((item, index) => <WeatherData key={index} time={item.dt} weather={item.weather} temperature={item.main.temp} timezoneval={timezone}/>) : <p>No Data Found.</p>}
        
      </div>

    </>
  )
}

export default App
