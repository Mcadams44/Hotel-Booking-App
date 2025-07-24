import { useState, useEffect } from 'react';
import { hotels } from './hotels';
import { rooms } from './rooms';
import { reviews } from './reviews';
import { bookings as initialBookings } from './bookings';
import { users as initialUsers } from './users';
import { getStorageData, setStorageData, addStorageItem, updateStorageItem } from '../utils/localStorage';

// Example component showing how to use static data instead of API calls
function DataUsageExample() {
  // Get all hotels (static data, no need for useState)
  const allHotels = hotels;
  
  // Get rooms for a specific hotel
  const hotelId = 1; // Example hotel ID
  const hotelRooms = rooms.filter(room => room.hotel_id === hotelId);
  
  // Get reviews for a specific hotel
  const hotelReviews = reviews.filter(review => review.hotel_id === hotelId);
  
  // For data that needs to be modified (bookings), use localStorage
  const [bookings, setBookings] = useState(() => {
    return getStorageData('bookings', initialBookings);
  });
  
  // For user data, also use localStorage
  const [users, setUsers] = useState(() => {
    return getStorageData('users', initialUsers);
  });
  
  // Save to localStorage whenever bookings or users change
  useEffect(() => {
    setStorageData('bookings', bookings);
  }, [bookings]);
  
  useEffect(() => {
    setStorageData('users', users);
  }, [users]);
  
  // Example function to add a new booking
  const addNewBooking = (newBooking) => {
    // Generate a new ID
    const maxId = bookings.reduce((max, booking) => 
      booking.id > max ? booking.id : max, 0);
    
    const bookingWithId = {
      ...newBooking,
      id: maxId + 1
    };
    
    setBookings([...bookings, bookingWithId]);
  };
  
  // Example function to update a booking status
  const updateBookingStatus = (bookingId, status) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    ));
  };
  
  // Example function to add a new user
  const addNewUser = (newUser) => {
    // Generate a new ID
    const maxId = users.reduce((max, user) => 
      user.id > max ? user.id : max, 0);
    
    const userWithId = {
      ...newUser,
      id: maxId + 1
    };
    
    setUsers([...users, userWithId]);
    return userWithId;
  };
  
  return (
    <div>
      <h2>Data Usage Example</h2>
      <p>This is just an example component showing how to use static data instead of API calls.</p>
      <p>Check the code for implementation details.</p>
    </div>
  );
}

export default DataUsageExample;