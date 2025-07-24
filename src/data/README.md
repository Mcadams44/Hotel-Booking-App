# Static Data for Hotel Booking App

This directory contains static JSON data files that replace API calls in the application.

## Files

- `hotels.js` - Contains data for all hotels
- `rooms.js` - Contains data for all rooms
- `reviews.js` - Contains hotel reviews
- `bookings.js` - Contains booking data (will be used with localStorage)
- `users.js` - Contains user data (will be used with localStorage)

## How to Use

Import these files directly in your components instead of making API calls:

```jsx
import { hotels } from '../data/hotels';
import { rooms } from '../data/rooms';
import { reviews } from '../data/reviews';

// Example usage
const hotelList = hotels;
const hotelRooms = rooms.filter(room => room.hotel_id === hotelId);
const hotelReviews = reviews.filter(review => review.hotel_id === hotelId);
```

## Data Management

For data that needs to be modified (like bookings and users):

1. Import the initial data
2. Use localStorage to persist changes
3. Use React state to manage the data during the session

Example:

```jsx
import { useState, useEffect } from 'react';
import { bookings as initialBookings } from '../data/bookings';

function BookingManager() {
  // Initialize state from localStorage or fall back to initial data
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings) : initialBookings;
  });

  // Save to localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Function to add a new booking
  const addBooking = (newBooking) => {
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
  };

  // Rest of component...
}
```