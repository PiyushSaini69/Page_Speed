import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Component/Home'

// import {BrowserRoutes as Router, Routes ,Route} from 'react-router-dom'
import {Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>


    <Routes>
      
      
      <Route path='/' element={<Home/>} />
      
    </Routes>

    {/* <File/> */}
    {/* <Home/> */}
      </>
  )
}

export default App
