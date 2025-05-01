import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import EquipmentCard from '../components/EquipmentCard';
import { Link } from 'react-router-dom';
import '../App.css';

const RenteeDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter equipment based on search query
  const filteredEquipment = equipmentList.filter(
    (equipment) =>
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.price.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { t } = useTranslation();

  return (
    <div className="rentee-dashboard">
      <LanguageSwitcher />
      <h1>{t('dashboard')}</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder={t('Search equipment by name, description, or price...') || 'Search equipment by name, description, or price...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">{t('Search') || 'Search'}</button>
      </div>

      {/* Link to Borrowing History */}
      <Link to="/borrowing-history" className="history-link">
        {t('View Borrowing History') || 'View Borrowing History'}
      </Link>

      {/* Available Equipment */}
      <div className="available-equipment">
        <h2>{t('Available Equipment') || 'Available Equipment'}</h2>
        {filteredEquipment.length > 0 ? (
          <div className="equipment-grid">
            {filteredEquipment.map((equipment, index) => (
              <EquipmentCard
                key={index}
                equipment={equipment}
                isRentee={true}
              />
            ))}
          </div>
        ) : (
          <div className="not-found-message">
            <p>{t('No equipment found. Try something else! 😊') || 'No equipment found. Try something else! 😊'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenteeDashboard;