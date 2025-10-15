import Button from '@mui/material/Button';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import "./SearchBox.css";
import { useState, useEffect } from 'react';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);
    const [showError, setShowError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather"; 
    const API_KEY = "ea89245ae98aeaba75d6d2c136b58956"; 

    const getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            if (jsonResponse.cod !== 200) {
                throw new Error("City not found");
            }

            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                minTemp: jsonResponse.main.temp_min,
                maxTemp: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feels_like: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                country: jsonResponse.sys.country,
            };
            return result;
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
                setError(false); // Reset error to allow future displays
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleChange = (evt) => {
        setCity(evt.target.value);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setError(false);  // Reset error if successful
        } catch (err) {
            setShowError(false); // Hide any existing message
            setError(true);  // Trigger error message again
        }
        setCity("");  // Clear input field after submission
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="outlined-basic" 
                    label="City" 
                    variant="outlined" 
                    required 
                    value={city} 
                    onChange={handleChange} 
                />
                <br /><br /> &nbsp;
                <Button variant="contained" type='submit'>Search</Button>     
                {showError && <p style={{ color: "red" }}>No such place exists!</p>}
            </form>
        </div>
    );
}
