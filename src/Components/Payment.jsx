import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rooms } from '../data/rooms';
import { hotels } from '../data/hotels';



function Payment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookingData = bookings.find(b => b.id === parseInt(bookingId));
    
    if (bookingData) {
      setBooking(bookingData);
      setUser(bookingData.user);
      
      const roomData = rooms.find(r => r.id === bookingData.room_id);
      setRoom(roomData);
      
      if (roomData) {
        const hotelData = hotels.find(h => h.id === roomData.hotel_id);
        setHotel(hotelData);
      }
    }
    
    setLoading(false);
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update booking status in localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = bookings.map(b => 
      b.id === parseInt(bookingId) ? { ...b, status: 'confirmed' } : b
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    alert('Payment successful! Your booking is confirmed.');
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading payment details...</div>;
  }

  if (!booking || !room || !hotel || !user) {
    return <div className="error">Booking information not found</div>;
  }

  return (
    <div className="payment-container">
      <h1>Complete Your Payment</h1>
      
      <div className="payment-summary">
        <h2>Booking Summary</h2>
        <div className="summary-item">
          <span>Hotel:</span>
          <span>{hotel.name}</span>
        </div>
        <div className="summary-item">
          <span>Room:</span>
          <span>{room.name}</span>
        </div>
        <div className="summary-item">
          <span>Check-in:</span>
          <span>{booking.check_in}</span>
        </div>
        <div className="summary-item">
          <span>Check-out:</span>
          <span>{booking.check_out}</span>
        </div>
        <div className="summary-item">
          <span>Guests:</span>
          <span>{booking.guests}</span>
        </div>
        <div className="summary-item total">
          <span>Total Amount:</span>
          <span>${booking.total_price}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="cardName">Name on Card</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={paymentData.cardName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          
          <div className="form-group half">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
        </div>
        
        <button type="submit" className="pay-btn">Pay ${booking.total_price}</button>
      </form>
    </div>
  );
}

export default Payment;