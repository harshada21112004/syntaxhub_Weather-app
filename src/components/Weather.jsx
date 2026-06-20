import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


const Weather = ({ setCity }) => {


    const inputRef = useRef();

    const [weatherData, setweatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const today = new Date();

    const day = today.toLocaleDateString("en-US", {
        weekday: "long"
    });

    const date = today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });


    const search = async (city) => {
        if (city == "") {
            alert("Enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setweatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
            setCity(data.name);

        }
        catch (error) {
            setweatherData(false);
            console.error("Error in fetching weather data");
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

                    const response = await fetch(url);
                    const data = await response.json();

                    if (!response.ok) {
                        alert(data.message);
                        return;
                    }

                    const icon = allIcons[data.weather[0].icon] || clear_icon;

                    setweatherData({
                        humidity: data.main.humidity,
                        windSpeed: data.wind.speed,
                        temperature: Math.floor(data.main.temp),
                        location: data.name,
                        icon: icon
                    });
                    setCity(data.name);

                } catch (error) {
                    setweatherData(false);
                    console.error("Error in fetching weather data");
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search'
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            search(inputRef.current.value);
                            inputRef.current.value = "";
                        }
                    }}
                />
                < img src={search_icon} alt="" onClick={() => {
                    search(inputRef.current.value)
                    inputRef.current.value = "";
                }} />
            </div>

            {weatherData ? <>
                <img src={weatherData.icon} alt="" className='weather-icon' />
                <p className='temperature'>{weatherData.temperature}°C</p>
                <p className='location'>{weatherData.location}</p>

                <p className='day'>{day}</p>
                <p className='date'>{date}</p>

                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt="" />
                        <div>
                            <p>{weatherData.windSpeed}Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </> : <></>}
        </div>
    )
}

export default Weather
