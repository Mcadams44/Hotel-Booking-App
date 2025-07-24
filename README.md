# Hotel Booking Application

A React application for booking hotel rooms with features like hotel listings, room selection, booking, and payment processing. This project uses static data and localStorage for data persistence, making it easy to run without external dependencies.

## Features

- Browse hotels with detailed information
- View available rooms and their details
- Make reservations with check-in and check-out dates
- Process payments for bookings
- View guest reviews
- Responsive design with navigation bar and footer
- Local data persistence using browser localStorage

## Technologies Used

- React 18
- React Router DOM
- Vite (build tool)
- CSS for styling
- localStorage for data persistence
- Static JSON data (no external API required)

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Hotel-Booking-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

That's it! No external API or database setup required - the application uses static data files and localStorage for persistence.

## Project Structure

```
src/
├── Components/
│   ├── Navbar.jsx          # Navigation bar
│   ├── Footer.jsx          # Footer component
│   ├── Hotellist.jsx       # List of available hotels
│   ├── Hotelcard.jsx       # Individual hotel card
│   ├── HotelDetail.jsx     # Detailed view of a hotel
│   ├── Addbookingform.jsx  # Form for booking a room
│   └── Payment.jsx         # Payment processing
├── data/
│   ├── hotels.js           # Static hotel data
│   ├── rooms.js            # Static room data
│   ├── reviews.js          # Static review data
│   ├── bookings.js         # Initial booking data
│   ├── users.js            # Initial user data
│   └── README.md           # Data usage documentation
├── utils/
│   └── localStorage.js     # localStorage utility functions
├── App.jsx                 # Main application component
├── App.css                 # Application styles
├── index.css               # Global styles
└── main.jsx                # Application entry point
```

## Data Management

This application uses a hybrid approach for data management:

- **Static Data**: Hotels, rooms, and reviews are stored in static JavaScript files
- **Dynamic Data**: Bookings and users are managed using localStorage for persistence
- **No External API**: All data operations are handled client-side

### Static Data Files

- `src/data/hotels.js` - Contains all hotel information
- `src/data/rooms.js` - Contains room details for each hotel
- `src/data/reviews.js` - Contains guest reviews for hotels

### localStorage Data

- Bookings are saved to localStorage and persist between sessions
- User information is stored locally when creating bookings
- Data is automatically loaded from localStorage on app startup

## Team Development

This project is designed for collaborative development with four feature branches:

1. **feature/hotel-listing** - Hotel listing, navbar, footer, and static data setup
2. **feature/hotel-details** - Hotel detail pages and room information
3. **feature/booking-system** - Booking forms and reservation logic
4. **feature/payment-system** - Payment processing and booking confirmation

See `project-branches.md` for detailed development guidelines and Git workflow.

## Development Workflow

### For Team Members

1. **Start from development branch**:
   ```bash
   git checkout development
   git pull origin development
   ```

2. **Create your feature branch**:
   ```bash
   git checkout -b feature/your-branch-name
   ```

3. **Work on your assigned components**

4. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "Implement your feature"
   git push origin feature/your-branch-name
   ```

5. **Create a Pull Request** to merge into the development branch

### Branch Responsibilities

- **Branch 1**: Sets up the foundation (navbar, footer, static data, basic routing)
- **Branch 2**: Builds hotel detail functionality using the static data
- **Branch 3**: Implements booking system with localStorage integration
- **Branch 4**: Completes payment processing and booking confirmation

## Contributing

1. Follow the branch structure outlined in `project-branches.md`
2. Use the static data files instead of API calls
3. Implement localStorage for data that needs to persist
4. Maintain consistent styling with the existing CSS
5. Test your components thoroughly before creating pull requests