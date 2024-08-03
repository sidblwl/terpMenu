import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Menu from './components/Menu.jsx'
import Homepage from './components/Homepage.jsx'
import { Routes, Route, useParams, Link } from "react-router-dom";
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import GoogleAuth from './components/GoogleAuth.jsx';

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path=":diningHall" element={<Menu/>} />
        </Routes>
    </>
  )
}

export default App