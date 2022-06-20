import {GetForeCastCards, GetCurrentWeatherCard} from "./WeatherCard";
import React, {useEffect, useState} from "react";

const Body = () => {
    const [currentWeatherData, setCurrentWeatherData] = useState([]);
    const [forecastWeatherData, setForecastWeatherData] = useState([]);
    const [city, setCity] = useState("Mount Pearl");

    useEffect(() => {
        async function fetchCurrentWeatherData() {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
            setCurrentWeatherData(await response.json());

        }

        fetchCurrentWeatherData()

    }, [city]);

    useEffect(() => {
        async function fetchForecastData() {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
            setForecastWeatherData(await response.json());

        }

        fetchForecastData()

    }, [city]);

    const handleCityChange = (event) => {
        setCity(event);
    }

    return (
        <div className="App">
            {(typeof currentWeatherData.main != 'undefined') && (typeof forecastWeatherData.list != 'undefined') ? (
                <div>
                    <GetCurrentWeatherCard weatherData={currentWeatherData} triggerParentUpdate={handleCityChange}/>
                    <GetForeCastCards weatherData={forecastWeatherData}/>
                </div>
            ) : (
                <div>Invalid City Or Fetch Statement Has Encountered Problems Please Refresh</div>
            )}

        </div>
    );

}

export default Body;