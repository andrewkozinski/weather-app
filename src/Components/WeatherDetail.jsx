import {useParams} from "react-router-dom";
import React from "react";

const WeatherDetail = () => {

    let params = useParams();


    return (
        <div>
            <h1>Weather Detail</h1>


            <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Counter</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>

      <div className="window-body">
      </div>
    </div>



        </div>
    );
}

export default WeatherDetail;