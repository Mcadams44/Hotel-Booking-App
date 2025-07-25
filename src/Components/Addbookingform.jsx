import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rooms } from '../data/rooms';
import { hotels } from '../data/hotels';

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
    const roomData = rooms.find(r => r.id === parseInt(roomId));
    const hotelData = roomData ? hotels.find(h => h.id === roomData.hotel_id) : null;
    
    setRoom(roomData || null);
    setHotel(hotelData || null);
    setLoading(false);
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotalPrice = () => {
    if (!room || !formData.checkIn || !formData.checkOut) return 0;
    const inDate = new Date(formData.checkIn);
    const outDate = new Date(formData.checkOut);
    const nights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * room.price : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingId = Date.now();
    const booking = {
      id: bookingId,
      room_id: parseInt(roomId),
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      guests: parseInt(formData.guests),
      total_price: calculateTotalPrice(),
      status: 'pending',
      user: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      }
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    navigate(`/payment/${bookingId}`);
  };

  if (loading) return <div>⏳ Loading booking form...</div>;
  if (!room || !hotel) return <div>❌ Room or Hotel not found</div>;

  return (
    <div className="booking-form-container">
      <h1>Book Your Stay</h1>

      <div className="booking-summary">
        <h2>Booking Summary</h2>
        <p><strong>Hotel:</strong> {hotel.name}</p>
        <p><strong>Room Type:</strong> {room.name}</p>
        <p><strong>Price per Night:</strong> ${room.price}</p>
        {formData.checkIn && formData.checkOut && (
          <p><strong>Total Price:</strong> ${calculateTotalPrice()}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Check-in Date:
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </label>

        <label>
          Check-out Date:
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            min={formData.checkIn || new Date().toISOString().split('T')[0]}
            required
          />
        </label>

        <label>
          Number of Guests:
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max={room.capacity}
            required
          />
        </label>

        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}

export default BookingForm;
