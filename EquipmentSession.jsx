import React, { useEffect, useState } from 'react';

const EquipmentSession = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/equipment');
        if (!res.ok) throw new Error('Failed to fetch equipment');
        const data = await res.json();
        setEquipment(data);
      } catch (err) {
        setError(err.message || 'Error fetching equipment');
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  if (loading) return <div className="loading">Loading equipment...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="equipment-session-page">
      <h1>Available Equipment</h1>
      {equipment.length === 0 ? (
        <p>No equipment available.</p>
      ) : (
        <div className="equipment-list">
          {equipment.map((eq, idx) => (
            <div key={eq.id || idx} className="equipment-card">
              <h3>{eq.name}</h3>
              <div><strong>Type:</strong> {eq.type || '-'}</div>
              <div><strong>Manufacturer:</strong> {eq.manufacturer || '-'}</div>
              <div><strong>Model:</strong> {eq.model || '-'}</div>
              <div><strong>Year:</strong> {eq.year || '-'}</div>
              <div><strong>Condition:</strong> {eq.condition || '-'}</div>
              <div><strong>Rental Price:</strong> ₹{eq.rentalPrice || '-'}</div>
              <div><strong>Availability:</strong> {eq.availability || '-'}</div>
              <div><strong>Description:</strong> {eq.description || '-'}</div>
              <div><strong>Status:</strong> {eq.status || '-'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentSession;
