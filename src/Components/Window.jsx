import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

//Not the cleanest implementation but it works.
const Window = ({currentCity, displayData, maxTemp, minTemp, chartData, handleSearch, setSearchTerm, setSearchTime, weatherFilter, setWeatherFilter, handleFilter, searchDate, setSearchDate, handleClearFilters, searchTime}) => {

    return(
        <div className="window" style={{marginBottom: "20px"}}>
            <div className="title-bar">
                <div className="title-bar-text">{currentCity}</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" />
                </div>
            </div>

            <div className="window-body">
                
            <div>
        <h3>Current City: {currentCity}</h3>
        <h4>Results Found: {displayData.length} | Max Temperature: {maxTemp}°F | Min Temperature: {minTemp}°F</h4>
      </div>

      {chartData.labels && chartData.labels.length > 0 ? <Line data={chartData} /> : null}

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

                
            </div>
        </div>
    );


}

export default Window;