import React, { useEffect, useState } from "react";
import "./Forecast.css";
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'

const Forecast = ({ city }) => {
    const [forecast, setForecast] = useState([]);

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
    };

    useEffect(() => {
        if (!city) return;

        const fetchForecast = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

                const response = await fetch(url);
                const data = await response.json();

                // Get one forecast per day (every 8th item = 24 hours)
                const dailyForecast = data.list.filter(
                    (item, index) => index % 8 === 0
                );

                setForecast(dailyForecast.slice(0, 5));
            } catch (error) {
                console.log("Forecast Error");
            }
        };

        fetchForecast();
    }, [city]);

    return (
        <div className="forecast-container">
            <h3>5-Day Forecast</h3>

            <div className="forecast-cards">
                {forecast.map((item, index) => (
                    <div className="forecast-card" key={index}>
                        <p>
                            {new Date(item.dt_txt).toLocaleDateString("en-US", {
                                weekday: "short",
                            })}
                        </p>

                        <img
                            src={allIcons[item.weather[0].icon] || clear_icon}
                            alt=""
                        />

                        <p>{Math.floor(item.main.temp)}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;