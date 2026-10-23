import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

function TaiwanFlag() {
  return (
    <svg className="lang-toggle__flag" viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#FE0000" />
      <rect width="15" height="10" fill="#000095" />
      <circle cx="7.5" cy="5" r="2.2" fill="#fff" />
    </svg>
  );
}

function UsFlag() {
  const stripe = 20 / 13;
  return (
    <svg className="lang-toggle__flag" viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#B22234" />
      {[1, 3, 5, 7, 9, 11].map((row) => (
        <rect key={row} y={row * stripe} width="30" height={stripe} fill="#fff" />
      ))}
      <rect width="12" height={7 * stripe} fill="#3C3B6E" />
    </svg>
  );
}

function LanguageToggle({ onClick = () => {} }) {
  const { language } = useContext(AppContext);
  const isZh = language.value === 'zh';

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={() => {
        language.toggle();
        onClick();
      }}
      aria-label={isZh ? '目前是中文，切換為英文' : 'English selected, switch to Chinese'}
      title={isZh ? '中文' : 'English'}
    >
      {isZh ? <TaiwanFlag /> : <UsFlag />}
    </button>
  );
}

LanguageToggle.propTypes = {
  onClick: PropTypes.func,
};

export default LanguageToggle;
