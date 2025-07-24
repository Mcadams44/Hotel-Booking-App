function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Hotel Booking</h3>
            <p>Your trusted partner for finding the perfect accommodation worldwide.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">Hotels</a></li>
              <li><a href="/">About Us</a></li>
              <li><a href="/">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="/">Help Center</a></li>
              <li><a href="/">Terms of Service</a></li>
              <li><a href="/">Privacy Policy</a></li>
              <li><a href="/">Cancellation Policy</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@hotelbooking.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Travel Street, City, Country</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Hotel Booking App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;