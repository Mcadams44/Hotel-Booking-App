import { Link } from 'react-router-dom';

function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      <div className="hotel-info">
        <h3>{hotel.name}</h3>
        <div className="hotel-location">{hotel.city}, {hotel.country}</div>
        <div className="hotel-rating">Rating: {hotel.rating}/5</div>
        <div className="hotel-price">Price Range: {hotel.price_range}</div>
        <div className="hotel-amenities">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
          {hotel.amenities.length > 3 && <span className="amenity-more">+{hotel.amenities.length - 3} more</span>}
        </div>
        <Link to={`/hotel/${hotel.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default HotelCard;