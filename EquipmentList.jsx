import React, { useEffect, useState } from 'react';
import EquipmentCard from '../components/EquipmentCard';
import { useTranslation } from 'react-i18next';
import '../App.css';

const EquipmentList = () => {
  const { t } = useTranslation();
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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

  return (
    <div className="equipment-list-page">
      <h1>{t('Available Equipment')}</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message" style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {equipmentList.length > 0 ? (
        <div className="equipment-grid">
          {equipmentList.map((equipment, index) => (
            <EquipmentCard key={index} equipment={equipment} />
          ))}
        </div>
      ) : (
        <p>{t('No equipment uploaded yet.')}</p>
      )}
    </div>
  );
};

export default EquipmentList;
