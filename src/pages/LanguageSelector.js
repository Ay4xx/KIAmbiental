import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <div>
      <button
        onClick={toggleLanguage}
        style={{
          display: 'flex',
          border: 'none',
          borderRadius: '20px',
          overflow: 'hidden',
          padding: 0,
          backgroundColor: '#05141f',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span
          style={{
            background: i18n.language === 'en' ? '#1976d2' : '#05141f',
            color: i18n.language === 'en' ? '#fff' : '#ccc',
            padding: '8px 16px',
            fontWeight: i18n.language === 'en' ? 'bold' : 'normal',
            transition: 'background 0.3s, color 0.3s',
          }}
        >
          EN
        </span>
        <span
          style={{
            background: i18n.language === 'es' ? '#1976d2' : '#05141f',
            color: i18n.language === 'es' ? '#fff' : '#ccc',
            padding: '8px 16px',
            fontWeight: i18n.language === 'es' ? 'bold' : 'normal',
            transition: 'background 0.3s, color 0.3s',
          }}
        >
          ES
        </span>
      </button>
    </div>
  );
}

export default LanguageSelector;
