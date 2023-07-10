import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { fetchWeatherData, selectWeatherData, selectWeatherLoading, selectWeatherError } from '../../store/slice/weatherSlice';

import './weatherWidget.css';

function WeatherWidget() {
    const dispatch = useDispatch();
    const weatherData = useSelector(selectWeatherData);
    const loading = useSelector(selectWeatherLoading);
    const error = useSelector(selectWeatherError);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                handleLocationSuccess,
                handleLocationError
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const handleLocationSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(fetchWeatherData({ latitude, longitude }));
    };

    const handleLocationError = (error) => {
        console.error('Failed to retrieve user location:', error);
    };

    const getWeatherIcon = (description) => {
        switch (description) {
            case 'Clear':
                return 'bi-sun';
            case 'Clouds':
                return 'bi-cloud';
            case 'Thunderstorm':
                return 'bi-cloud-lightning';
            case 'Snow':
                return 'bi-snow';
            case 'Rain':
                return 'bi-cloud-rain';
            default:
                return null;
        }
    };

    return (
        <div className="weather-widget">
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : error ? (
                <p>Error: {error}</p>
            ) : weatherData ? (
                <div className="weather-card m-4">
                    <i className={`bi ${getWeatherIcon(weatherData.weather[0].main)} fs-2`}></i>
                    <h1 className="display-6">
                        <b>{Math.round(weatherData.main.temp)}°C</b>
                    </h1>
                    <p className="display-6">{weatherData.name}</p>
                </div>
            ) : null}
        </div>
    );

}

export default WeatherWidget;
