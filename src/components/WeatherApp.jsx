import React, { useState, useEffect } from 'react';
import axios from "axios";


const WeatherApp = () => {
    const date = new Date();
    const [city, setCity] = useState(null);
    const [datetime, setDateTime] = useState(date.toLocaleTimeString());
    const [search, setSearch] = useState("");

    useEffect(() => {
        const CityApi = async () => {

            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=886dfe50b271141f1c3cfc863f76d96f&units=metric`);
            // console.log(response);
            setCity(response.data.main);
        }
        CityApi();
    }, [search])

    const eventFunction = (e) => {
        setSearch(e.target.value);
    }

    setInterval(() => 
        {
            const date = new Date();
            setDateTime(date.toLocaleTimeString());
        }, 1000);

   


    return (
        <>
            <div className="weather-section">
                <div className="container-fluid px-1 px-md-4 py-5 mx-auto">
                    <div className="row d-flex justify-content-center px-3">
                        <div className="card">
                            <input type="search" className='input-field' placeholder='Enter city name here...' value={search} onChange={eventFunction} />
                            {!city || !search ?
                                (
                                    <p className='mx-auto mt-4 med-font'>Data Not Found</p>
                                ) :
                                (
                                    <>
                                        <h2 className="ml-auto mr-4 mt-3 mb-0">{search}</h2>
                                        <h2 className="ml-auto mr-4 mt-3 mb-0">{city.name}</h2>
                                        <p className="ml-auto mr-4 mb-0 med-font">Temp- {city.temp} °C</p>
                                        <p className="ml-4 mb-4 mr-4 text-right">MinTemp- {city.temp_min} °C | MaxTemp- {city.temp_max} °C</p>
                                    </>
                                )
                            }

                            <p className="time-font mb-0 ml-4 mt-auto">{datetime}</p>
                            <p className="ml-4 mb-4">{date.toDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherApp;
