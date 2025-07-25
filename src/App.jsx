import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import HotelList from './Components/Hotellist'
import HotelDetail from './Components/HotelDetail'
import BookingForm from './Components/Addbookingform'
import Payment from './Components/Payment'
import Footer from './Components/Footer'


function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<HotelList />} />
              <Route path="/hotel/:id" element={<HotelDetail />} />
              <Route path="/booking/:roomId" element={<BookingForm />} />
              <Route path="/payment/:bookingId" element={<Payment />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
