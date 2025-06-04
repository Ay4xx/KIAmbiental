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
          border: '1px solid #ccc',
          borderRadius: '4px',
          overflow: 'hidden',
          padding: 0,
        }}
      >
        <span
          style={{
            background: i18n.language === 'en' ? '#007bff' : '#fff',
            color: i18n.language === 'en' ? '#fff' : '#000',
            padding: '8px 16px',
            borderRight: '1px solid #ccc',
            fontWeight: i18n.language === 'en' ? 'bold' : 'normal',
            transition: 'background 0.2s',
          }}
        >
          EN
        </span>
        <span
          style={{
            background: i18n.language === 'es' ? '#007bff' : '#fff',
            color: i18n.language === 'es' ? '#fff' : '#000',
            padding: '8px 16px',
            fontWeight: i18n.language === 'es' ? 'bold' : 'normal',
            transition: 'background 0.2s',
          }}
        >
          ES
        </span>
      </button>
    </div>
  );
}

export default LanguageSelector;
