import React from 'react';
import PropTypes from 'prop-types';

const ErrorAlert = ({ message }) => (
  <div role="alert" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" aria-live="assertive">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorAlert;
