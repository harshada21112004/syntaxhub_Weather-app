import React, { useState } from 'react'
import Weather from './components/Weather'
import Forecast from './components/Forecast'

const App = () => {
  const[city,setCity]=useState("");
  return (
    <div className='app'>
        <Weather setCity={setCity}/>
        <Forecast city={city}/>
    </div>
  )
}

export default App
