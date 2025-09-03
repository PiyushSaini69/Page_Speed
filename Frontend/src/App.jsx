import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Component/Home'

// import {BrowserRoutes as Router, Routes ,Route} from 'react-router-dom'
import {Routes, Route } from "react-router-dom";
import Test from './Component/Test'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>


    <Routes>
      
      
      <Route path='/' element={<Test/>} />
      
    </Routes>

    {/* <File/> */}
    {/* <Home/> */}
      </>
  )
}

export default App
