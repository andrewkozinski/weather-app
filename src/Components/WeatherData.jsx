import "98.css";
import { Link } from "react-router-dom";

const WeatherData = (props) => {

    return (
        <div className="window weather">
            <div className="title-bar" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" />
                </div>
            </div>
            <div className="title-bar">
            <h3 className="title-bar-text">
                <Link 
                    to={`/weatherDetails/${props.fullData[props.index].dt}`} key={props.index}
                    style={{color: "White"}}
                >
                    {(new Date((props.time + props.timezoneval) * 1000)).toUTCString()}
                </Link>
            </h3>
            <img src={`https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`}/>
            </div>
            <div className="window-body">
                <p>Weather: {props.weather[0].main}</p>
                <p>Temperature: {props.temperature}°F</p>
            </div>
        </div>
    );
}

export default WeatherData;