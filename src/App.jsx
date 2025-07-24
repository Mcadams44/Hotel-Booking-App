import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import HotelList from './Components/Hotellist'
import HotelDetail from './Components/HotelDetail'
import BookingForm from './Components/AddBookingForm'  
import Payment from './Components/Payment'
import Footer from './Components/Footer'
import AddBookingForm from './Components/AddBookingForm';

<Route path="/booking/:roomId" element={<AddBookingForm />} />


function App() {
  return (
    <Router>
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
