import { useState } from 'react';
import HotelCard from './Hotelcard';
import { hotels as hotelData } from '../data/hotels';

function HotelList() {
  const [hotels] = useState(hotelData);
  const [loading] = useState(false);

  return (
    <div className="hotel-list">
      <h1>Available Hotels</h1>
      <div className="hotel-grid">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default HotelList;