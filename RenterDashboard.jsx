import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import EquipmentForm from '../components/EquipmentForm';
import EquipmentCard from '../components/EquipmentCard'; // Import EquipmentCard
import '../App.css';

const RenterDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
    const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch equipment from backend on mount
  React.useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/equipment', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch equipment.');
        setEquipmentList(data);
      } catch (err) {
        setError(err.message || 'Error fetching equipment.');
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  // Add equipment using backend API
  const handleAddEquipment = async (equipment) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      for (const key in equipment) {
        if (equipment[key] !== undefined && equipment[key] !== null) {
          formData.append(key, equipment[key]);
        }
      }
      // If photo is a File object, append as 'photo'
      if (equipment.photo && equipment.photo instanceof File) {
        formData.set('photo', equipment.photo);
      }
      const res = await fetch('/api/equipment', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add equipment.');
      setEquipmentList(prev => [...prev, data]);
    } catch (err) {
      setError(err.message || 'Error adding equipment.');
    } finally {
      setLoading(false);
    }
  };

  // Delete equipment using backend API
  const handleDeleteEquipment = async (id) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/equipment/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete equipment.');
      }
      setEquipmentList(prev => prev.filter(eq => eq.id !== id));
    } catch (err) {
      setError(err.message || 'Error deleting equipment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button className="enhanced-btn" onClick={() => navigate('/add-equipment')}>
          Add New Equipment
        </button>
      </div>
      <div className="renter-dashboard">
        <LanguageSwitcher />
        <button
          onClick={() => window.location.href = '/equipment-list'}
          style={{margin: '10px 0', padding: '10px 18px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
          View All Equipment
        </button>
        <h1>{t('dashboard')}</h1>
        <EquipmentForm onAddEquipment={handleAddEquipment} />
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error-message" style={{ color: 'red', marginTop: 10 }}>{error}</div>}
        <div className="equipment-history">
          <h2>{t('Uploaded Equipment History') || 'Uploaded Equipment History'}</h2>
          {equipmentList.length > 0 ? (
            <div className="equipment-grid">
              {equipmentList.map((equipment) => (
                <EquipmentCard
                  key={equipment.id}
                  equipment={equipment}
                  onDelete={() => handleDeleteEquipment(equipment.id)}
                />
              ))}
            </div>
          ) : (
            <p>{t('No equipment uploaded yet.') || 'No equipment uploaded yet.'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenterDashboard;