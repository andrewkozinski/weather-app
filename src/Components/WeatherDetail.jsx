import {useParams} from "react-router-dom";
import React from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

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
          <Link to="/"><button aria-label="Close" /></Link>
        </div>
      </div>

      <div className="window-body">
      </div>
    </div>



        </div>
    );
}

export default WeatherDetail;