import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

// Summary component for all farm data
const AllFarmDataSummary = () => {
  const [workers, setWorkers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // MOCK DATA for demo purposes
    const mockWorkers = [
      {
        id: 1,
        name: 'Ramesh Kumar',
        specialization: 'Tractor Operator',
        daily_rate: 700,
        language_known: 'Hindi, English',
        experience: '5 years',
        status: 'Available'
      },
      {
        id: 2,
        name: 'Sita Devi',
        specialization: 'Irrigation Specialist',
        daily_rate: 650,
        language_known: 'Hindi',
        experience: '3 years',
        status: 'Available'
      },
      {
        id: 3,
        name: 'Mohan Lal',
        specialization: 'Harvester Operator',
        daily_rate: 800,
        language_known: 'Hindi, Punjabi',
        experience: '8 years',
        status: 'Busy'
      }
    ];
    const mockEquipment = [
      {
        id: 1,
        name: 'John Deere 5050D',
        type: 'Tractor',
        rentalPrice: 2500,
        manufacturer: 'John Deere',
        year: 2020,
        condition: 'Excellent',
        availability: 'Available',
        status: 'Available'
      },
      {
        id: 2,
        name: 'Mahindra Harvester 9500',
        type: 'Harvester',
        rentalPrice: 4000,
        manufacturer: 'Mahindra',
        year: 2019,
        condition: 'Good',
        availability: 'Available',
        status: 'Available'
      },
      {
        id: 3,
        name: 'Drip Irrigation Set',
        type: 'Irrigation',
        rentalPrice: 1200,
        manufacturer: 'Netafim',
        year: 2021,
        condition: 'New',
        availability: 'Available',
        status: 'Available'
      }
    ];
    const mockCombos = [
      {
        id: 1,
        workerName: 'Ramesh Kumar',
        equipmentName: 'John Deere 5050D',
        comboRate: 3000,
        specialization: 'Tractor Operator',
        status: 'Available'
      },
      {
        id: 2,
        workerName: 'Sita Devi',
        equipmentName: 'Drip Irrigation Set',
        comboRate: 1700,
        specialization: 'Irrigation Specialist',
        status: 'Available'
      }
    ];
    setWorkers(mockWorkers);
    setEquipment(mockEquipment);
    setCombos(mockCombos);
    setLoading(false);
  }, []);

  if (loading) return <div style={{ padding: 16 }}>Loading farm data...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="all-farm-data-summary" style={{ padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <strong>Workers:</strong> {workers.length} &nbsp;&nbsp;
        <strong>Equipment:</strong> {equipment.length} &nbsp;&nbsp;
        <strong>Combos:</strong> {combos.length}
      </div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <h4>Workers</h4>
          {workers.slice(0, 2).map((w, i) => (
            <div key={w.id || i} style={{ borderBottom: '1px solid #eee', marginBottom: 8 }}>
              <div><strong>Name:</strong> {w.name}</div>
              <div><strong>Specialization:</strong> {w.specialization || w.specifications || '-'}</div>
              <div><strong>Rate:</strong> ₹{w.daily_rate || '-'}</div>
            </div>
          ))}
          {workers.length > 2 && <div style={{ fontSize: 12, color: '#888' }}>...and more</div>}
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <h4>Equipment</h4>
          {equipment.slice(0, 2).map((e, i) => (
            <div key={e.id || i} style={{ borderBottom: '1px solid #eee', marginBottom: 8 }}>
              <div><strong>Name:</strong> {e.name}</div>
              <div><strong>Type:</strong> {e.type || '-'}</div>
              <div><strong>Rental Price:</strong> ₹{e.rentalPrice || '-'}</div>
            </div>
          ))}
          {equipment.length > 2 && <div style={{ fontSize: 12, color: '#888' }}>...and more</div>}
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <h4>Combos</h4>
          {combos.slice(0, 2).map((c, i) => (
            <div key={c.id || i} style={{ borderBottom: '1px solid #eee', marginBottom: 8 }}>
              <div><strong>Worker:</strong> {c.workerName}</div>
              <div><strong>Equipment:</strong> {c.equipmentName}</div>
              <div><strong>Combo Rate:</strong> ₹{c.comboRate || '-'}</div>
            </div>
          ))}
          {combos.length > 2 && <div style={{ fontSize: 12, color: '#888' }}>...and more</div>}
        </div>
      </div>
      <button onClick={() => navigate('/all-details')} style={{ marginTop: 16, padding: '8px 24px', background: '#006400', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        View All Details
      </button>
    </div>
  );
};

// Image URLs
const images = {
  tractor: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg',
  harvester: 'https://images.pexels.com/photos/5731894/pexels-photo-5731894.jpeg',
  irrigation: 'https://images.pexels.com/photos/4947386/pexels-photo-4947386.jpeg',
  farmer: 'https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg'
};

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>KrishiSeva.in</h1>
          <p className="hero-subtitle">Empowering Agriculture Through Sharing</p>
          <div className="search-bar-container">
            <input type="text" placeholder="Search for equipment..." className="search-input" />
            <button className="search-button">Search</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose KrishiSeva?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <img src={images.tractor} alt="Tractor" className="feature-image" />
            <h3>Wide Equipment Selection</h3>
            <p>Access to a diverse range of modern farming equipment</p>
          </div>
          <div className="feature-card">
            <img src={images.harvester} alt="Cost Effective" className="feature-image" />
            <h3>Cost Effective</h3>
            <p>Save money by renting instead of buying expensive equipment</p>
          </div>
          <div className="feature-card">
            <img src={images.irrigation} alt="Easy Process" className="feature-image" />
            <h3>Simple Process</h3>
            <p>Easy booking and secure payment system</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your account as a farmer or equipment owner</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Browse & Book</h3>
            <p>Find the equipment you need and book it</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Use & Return</h3>
            <p>Use the equipment and return it on time</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of farmers already using KrishiSeva</p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-button primary">Sign Up Now</Link>
            <Link to="/learn-more" className="cta-button secondary">Learn More</Link>
          </div>
        </div>
        <img src={images.farmer} alt="Happy Farmer" className="cta-image" />
      </section>

      {/* Features Section */}
      <section className="content-card">
        <div className="card-header">
          <h2>Why Choose Krishi Seva?</h2>
        </div>
        <div className="card-content feature-grid">
          <div className="feature-card">
            <h3>Easy Rentals</h3>
            <p>Book equipment through our simple digital platform</p>
          </div>
          <div className="feature-card">
            <h3>Affordable Pricing</h3>
            <p>Competitive rates with transparent costing</p>
          </div>
          <div className="feature-card">
            <h3>Verified Community</h3>
            <p>Government-verified farmers and service providers</p>
          </div>
        </div>
      </section>

      {/* All Farm Data Section */}
      <section className="content-card">
        <div className="card-header">
          <h2>Farm Resource Snapshot</h2>
        </div>
        <AllFarmDataSummary />
      </section>

      {/* Related Services Section */}
      <section className="content-card">
        <div className="card-header">
          <h2>Related Government Services</h2>
        </div>
        <div className="card-content">
          <div className="service-links">
            <Link to="/soil-health">Soil Health Card</Link>
            <Link to="/crop-insurance">Crop Insurance</Link>
            <Link to="/weather-alerts">Weather Advisory</Link>
            <Link to="/market-prices">Market Prices</Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="portal-footer">
        <p>A Government of India Initiative</p>
        <p>Ministry of Agriculture & Farmers Welfare</p>
      </footer>
    </div>
  );
};

export default Home;
