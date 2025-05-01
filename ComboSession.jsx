import React, { useEffect, useState } from 'react';

const ComboSession = () => {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCombos = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/worker-equipment-combos');
        if (!res.ok) throw new Error('Failed to fetch combos');
        const data = await res.json();
        setCombos(data);
      } catch (err) {
        setError(err.message || 'Error fetching combos');
      } finally {
        setLoading(false);
      }
    };
    fetchCombos();
  }, []);

  if (loading) return <div className="loading">Loading combos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="combo-session-page">
      <h1>Worker + Equipment Combos</h1>
      {combos.length === 0 ? (
        <p>No combos available.</p>
      ) : (
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

export default ComboSession;
