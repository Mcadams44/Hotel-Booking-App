import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookingForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // Fetch room details
        const roomResponse = await fetch(`http://localhost:3001/rooms/${roomId}`);
        const roomData = await roomResponse.json();
        setRoom(roomData);

        // Fetch hotel details
        const hotelResponse = await fetch(`http://localhost:3001/hotels/${roomData.hotel_id}`);
        const hotelData = await hotelResponse.json();
        setHotel(hotelData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching room data:', error);
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateTotalPrice = () => {
    if (!room || !formData.checkIn || !formData.checkOut) return 0;
    
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return nights > 0 ? nights * room.price : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a new user
    const userResponse = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      }),
    });
    
    const userData = await userResponse.json();
    
    // Create a new booking
    const bookingResponse = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userData.id,
        room_id: parseInt(roomId),
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        guests: parseInt(formData.guests),
        total_price: calculateTotalPrice(),
        status: 'pending'
      }),
    });
    
    const bookingData = await bookingResponse.json();
    
    // Navigate to payment page
    navigate(`/payment/${bookingData.id}`);
  };

  if (loading) {
    return <div className="loading">Loading booking form...</div>;
  }

  if (!room || !hotel) {
    return <div className="error">Room not found</div>;
  }

  return (
    <div className="booking-form-container">
      <h1>Book Your Stay</h1>
      
      <div className="booking-summary">
        <h2>Booking Summary</h2>
        <div className="summary-item">
          <span>Hotel:</span>
          <span>{hotel.name}</span>
        </div>
        <div className="summary-item">
          <span>Room Type:</span>
          <span>{room.name}</span>
        </div>
        <div className="summary-item">
          <span>Price per Night:</span>
          <span>${room.price}</span>
        </div>
        {formData.checkIn && formData.checkOut && (
          <div className="summary-item">
            <span>Total Price:</span>
            <span>${calculateTotalPrice()}</span>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="checkIn">Check-in Date</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="checkOut">Check-out Date</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            min={formData.checkIn || new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max={room.capacity}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">Proceed to Payment</button>
      </form>
    </div>
  );
}

export default BookingForm;