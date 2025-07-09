import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import hotel5 from './assets/hotel5.jpg';
import hotel4 from './assets/hotel4.jpg';
import hotel16 from './assets/hotel16.jpg';
import hotel17 from './assets/hotel17.jpg';
import hotel14 from './assets/hotel14.jpg';
import hotel6 from './assets/hotel6.jpg';

const BookingPage = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('deluxe');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const bookingData = { name, email, phone, checkIn, checkOut, guests, roomType };
    try {
      await axios.post('https://staytrack.onrender.com/api/bookings', bookingData);
      navigate('/payment', { state: { bookingData } });
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white',
      minHeight: '100vh',
    },
    header: {
      padding: '20px 0',
      backgroundColor: '#0c4b33',
      color: '#d4af37',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '30px',
      textAlign: 'center',
    },
    logo: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#ffffff',
    },
    tagline: {
      fontSize: '1.2rem',
      fontStyle: 'italic',
      color: '#ffffff',
    },
    content: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '30px',
      alignItems: 'stretch',
    },
    formContainer: {
      flex: '1 1 600px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
    },
    infoContainer: {
      flex: '1 1 400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      justifyContent: 'space-between',
    },
    infoCard: {
      backgroundColor: 'white',
      padding: '0',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      flex: '1',
    },
    heading: {
      fontSize: '1.3rem',
      marginBottom: '15px',
      color: '#0c4b33',
      borderBottom: '2px solid #d4af37',
      paddingBottom: '8px',
      padding: '15px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      marginTop: '6px',
      fontWeight: '600',
      color: '#0c4b33',
      fontSize: '0.9rem',
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '0.9rem',
    },
    select: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '0.9rem',
      backgroundColor: 'white',
    },
    button: {
      backgroundColor: '#0c4b33',
      color: '#ffffff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '4px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#093826',
    },
    featuresList: {
      listStyle: 'none',
      padding: '0 15px',
      margin: '0',
    },
    featureItem: {
      padding: '6px 0',
      borderBottom: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.9rem',
    },
    icon: {
      marginRight: '8px',
      color: '#d4af37',
      fontWeight: 'bold',
    },
    roomTypes: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
    },
    roomCard: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: '#fafafa',
      cursor: 'pointer',
      textAlign: 'center',
    },
    roomCardSelected: {
      border: '2px solid #0c4b33',
      backgroundColor: '#f0f9f0',
    },
    roomName: {
      fontWeight: 'bold',
      marginBottom: '4px',
      color: '#0c4b33',
      fontSize: '0.85rem',
    },
    roomPrice: {
      color: '#d4af37',
      fontWeight: 'bold',
      fontSize: '0.8rem',
    },
    confirmationContainer: {
      padding: '20px',
      backgroundColor: '#e6ffe6',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    successIcon: {
      fontSize: '3rem',
      color: '#28a745',
      marginBottom: '15px',
    },
    footer: {
      textAlign: 'center',
      padding: '15px 0',
      marginTop: '20px',
      borderTop: '1px solid #ddd',
      color: '#555',
      fontSize: '0.9rem',
    },
    gallery: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      padding: '15px',
    },
    galleryImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '6px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
    },
    galleryImageHover: {
      transform: 'scale(1.02)',
    },
    promoCode: {
      display: 'flex',
      gap: '8px',
    },
    promoInput: {
      flex: '1',
    },
    promoButton: {
      backgroundColor: '#d4af37',
      color: '#ffffff',
      fontWeight: 'bold',
      width: 'auto',
      padding: '8px 12px',
      fontSize: '0.9rem',
    },
  };

  const roomOptions = [
    { id: 'standard', name: 'Standard Room', price: 'Rs.9999 per night' },
    { id: 'deluxe', name: 'Deluxe Room', price: 'Rs.14999 per night' },
    { id: 'suite', name: 'Executive Suite', price: 'Rs.24999 per night' },
    { id: 'presidential', name: 'Presidential Suite', price: 'Rs.4999 per night' },
  ];

  const features = [
    'Free High-Speed WiFi',
    'Airport Shuttle Service',
    'Complimentary Breakfast',
    'Fitness Center & Spa',
    '24/7 Room Service',
    'Swimming Pool & Jacuzzi',
  ];

  // Selected best images for the gallery
  const galleryImages = [hotel5, hotel16, hotel17, hotel6];

  if (isSubmitted) {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logo}>Bookking.js</div>
          <div style={styles.tagline}>Luxury Reimagined</div>
        </header>

        <div style={styles.confirmationContainer}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0c4b33' }}>
            Booking Confirmed!
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
            Thank you for choosing Bookking.js. Your reservation from {checkIn} to {checkOut} has been received.
          </p>
          <p style={{ marginBottom: '30px' }}>
            A confirmation email has been sent to your registered email address with all details.
          </p>
          <button
            style={styles.button}
            onClick={() => setIsSubmitted(false)}
          >
            Make Another Booking
          </button>
        </div>

        <footer style={styles.footer}>
          <p>© 2025 Bookking.js Hotel. All rights reserved.</p>
          <p>123 Luxury Avenue, Resort City, RC 12345</p>
        </footer>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>Bookking.js</div>
        <div style={styles.tagline}>Luxury Reimagined</div>
      </header>

      <div style={styles.content}>
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Book Your Stay</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ ...styles.formGroup, flex: '1' }}>
                <label style={styles.label}>Check-in Date</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={styles.input} required />
              </div>
              <div style={{ ...styles.formGroup, flex: '1' }}>
                <label style={styles.label}>Check-out Date</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={styles.input} required />
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Number of Guests</label>
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} style={styles.select}>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Select Room Type</label>
              <div style={styles.roomTypes}>
                {roomOptions.map(room => (
                  <div
                    key={room.id}
                    style={{
                      ...styles.roomCard,
                      ...(roomType === room.id ? styles.roomCardSelected : {})
                    }}
                    onClick={() => setRoomType(room.id)}
                  >
                    <div style={styles.roomName}>{room.name}</div>
                    <div style={styles.roomPrice}>{room.price}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Promo Code</label>
              <div style={styles.promoCode}>
                <input type="text" placeholder="Enter promo code" style={{ ...styles.input, ...styles.promoInput }} />
                <button type="button" style={{ ...styles.button, ...styles.promoButton }}>Apply</button>
              </div>
            </div>
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            >
              Complete Booking
            </button>
          </form>
        </div>

        <div style={styles.infoContainer}>
          <div style={styles.infoCard}>
            <h3 style={styles.heading}>Hotel Features</h3>
            <ul style={styles.featuresList}>
              {features.map((feature, index) => (
                <li key={index} style={styles.featureItem}>
                  <span style={styles.icon}>✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.heading}>Hotel Gallery</h3>
            <div style={styles.gallery}>
              {galleryImages.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`hotel view ${index + 1}`} 
                  style={styles.galleryImage}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>© 2025 Bookking.js Hotel. All rights reserved.</p>
        <p>123 Luxury Avenue, Resort City, RC 12345</p>
      </footer>
    </div>
  );
};

export default BookingPage;