import React, { useEffect, useState } from 'react';

const AllDetails = () => {
  const [workers, setWorkers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [wRes, eRes, cRes] = await Promise.all([
          fetch('http://localhost:5000/api/workers'),
          fetch('http://localhost:5000/api/equipment'),
          fetch('http://localhost:5000/api/worker-equipment-combos')
        ]);
        if (!wRes.ok || !eRes.ok || !cRes.ok) throw new Error('Failed to fetch all details');
        const [wData, eData, cData] = await Promise.all([
          wRes.json(), eRes.json(), cRes.json()
        ]);
        setWorkers(wData);
        setEquipment(eData);
        setCombos(cData);
      } catch (err) {
        setError(err.message || 'Error fetching details');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <div className="loading">Loading all details...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="all-details-page">
      <h1>All Details: Workers, Equipment, Combos</h1>
      <h2>Workers</h2>
      {workers.length === 0 ? <p>No workers found.</p> : (
        <div className="worker-list">
          {workers.map((worker, idx) => (
            <div key={worker.id || idx} className="worker-card">
              <h3>{worker.name}</h3>
              <div><strong>Aadhar:</strong> {worker.adhar_no || '-'}</div>
              <div><strong>Daily Rate:</strong> ₹{worker.daily_rate || '-'}</div>
              <div><strong>Specialization:</strong> {worker.specifications || '-'}</div>
              <div><strong>Languages:</strong> {worker.language_known || '-'}</div>
              <div><strong>Experience:</strong> {worker.experience || '-'}</div>
              <div><strong>Status:</strong> {worker.status || '-'}</div>
            </div>
          ))}
        </div>
      )}
      <h2>Equipment</h2>
      {equipment.length === 0 ? <p>No equipment found.</p> : (
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
      <h2>Worker + Equipment Combos</h2>
      {combos.length === 0 ? <p>No combos found.</p> : (
        <div className="combo-list">
          {combos.map((combo, idx) => (
            <div key={combo.id || idx} className="combo-card">
              <h3>{combo.workerName} + {combo.equipmentName}</h3>
              <div><strong>Worker:</strong> {combo.workerName || '-'}</div>
              <div><strong>Equipment:</strong> {combo.equipmentName || '-'}</div>
              <div><strong>Specialization:</strong> {combo.specialization || '-'}</div>
              <div><strong>Combo Rate:</strong> ₹{combo.comboRate || '-'}</div>
              <div><strong>Status:</strong> {combo.status || '-'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDetails;
