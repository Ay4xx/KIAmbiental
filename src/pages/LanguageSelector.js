import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {/*puedes modificarlo a algo mas creativo que un boton o un selc, no se. no tengo creatividad*/}
      <button onClick={() => i18n.changeLanguage('es')}>ES</button>
      <button onClick={() => i18n.changeLanguage('en')} style={{ marginLeft: '0.5rem' }}>EN</button>
    </div>
  );
}

export default LanguageSelector;
