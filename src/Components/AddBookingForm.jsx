import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AddBookingForm() {
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
        const roomRes = await fetch(`http://localhost:3001/rooms/${roomId}`);
        if (!roomRes.ok) throw new Error("Room not found");
        const roomData = await roomRes.json();
        setRoom(roomData);

        const hotelRes = await fetch(`http://localhost:3001/hotels/${roomData.hotel_id}`);
        if (!hotelRes.ok) throw new Error("Hotel not found");
        const hotelData = await hotelRes.json();
        setHotel(hotelData);

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch:", err);
        setLoading(false);
      }
    };

    fetchRoomData();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRes = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      });

      const userData = await userRes.json();

      const bookingRes = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userData.id,
          room_id: parseInt(roomId),
          check_in: formData.checkIn,
          check_out: formData.checkOut,
          guests: parseInt(formData.guests),
          total_price: calculateTotalPrice(),
          status: 'pending'
        })
      });

      const bookingData = await bookingRes.json();
      navigate(`/payment/${bookingData.id}`);
    } catch (err) {
      console.error("Booking failed:", err);
    }
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

export default AddBookingForm;
