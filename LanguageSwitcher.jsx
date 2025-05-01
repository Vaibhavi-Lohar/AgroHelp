import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{
      margin: '0 20px',
      padding: '8px 16px',
      background: '#8B5C2D', // brown shade
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      display: 'inline-block',
      verticalAlign: 'middle'
    }}>
      <label style={{ fontWeight: 'bold', marginRight: 8 }}>{t('select_language')}:</label>
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        style={{
          fontSize: '1.1rem',
          padding: '6px 12px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          background: '#fff',
          cursor: 'pointer'
        }}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
