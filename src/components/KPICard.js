import React from 'react';
import PropTypes from 'prop-types';

const KPICard = ({ label, value }) => (
  <div
    className="bg-white rounded-2xl shadow p-6 flex-1 m-2"
    role="region"
    aria-label={`${label} KPI`}
  >
    <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

KPICard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default KPICard;
