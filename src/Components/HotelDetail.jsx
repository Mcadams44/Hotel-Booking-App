import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hotels as hotelData } from '../data/hotels';
import { rooms as roomData } from '../data/rooms';
import { reviews as reviewData } from '../data/reviews';

function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Convert id from string to number for comparison
    const hotelId = parseInt(id);
    
    // Get hotel details from static data
    const foundHotel = hotelData.find(h => h.id === hotelId);
    setHotel(foundHotel);
    
    // Get rooms for this hotel from static data
    const hotelRooms = roomData.filter(room => room.hotel_id === hotelId);
    setRooms(hotelRooms);
    
    // Get reviews for this hotel from static data
    const hotelReviews = reviewData.filter(review => review.hotel_id === hotelId);
    setReviews(hotelReviews);
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading hotel details...</div>;
  }

  if (!hotel) {
    return <div className="error">Hotel not found</div>;
  }

  return (
    <div className="hotel-detail">
      <div className="hotel-header">
        <h1>{hotel.name}</h1>
        <div className="hotel-location">{hotel.address}, {hotel.city}, {hotel.country}</div>
        <div className="hotel-rating">Rating: {hotel.rating}/5</div>
      </div>

      <div className="hotel-image-container">
        <img src={hotel.image} alt={hotel.name} className="hotel-detail-image" />
      </div>

      <div className="hotel-description">
        <h2>About this hotel</h2>
        <p>{hotel.description}</p>
      </div>

      <div className="hotel-amenities">
        <h2>Amenities</h2>
        <div className="amenities-list">
          {hotel.amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">{amenity}</div>
          ))}
        </div>
      </div>

      <div className="hotel-rooms">
        <h2>Available Rooms</h2>
        <div className="rooms-list">
          {rooms.map(room => (
            <div key={room.id} className="room-card">
              <img src={room.image} alt={room.name} className="room-image" />
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <div className="room-capacity">Capacity: {room.capacity} guests</div>
                <div className="room-price">${room.price} per night</div>
                <Link to={`/booking/${room.id}`} className="book-now-btn">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hotel-reviews">
        <h2>Guest Reviews</h2>
        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="review-user">{review.user}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="review-rating">Rating: {review.rating}/5</div>
                <div className="review-comment">{review.comment}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default HotelDetail;