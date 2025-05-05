import React from 'react';
//separamos el componente //lo comenten en dash solo para ver cambios
const LoadingSpinner = () => (
  <div role="status" aria-label="Cargando" className="flex justify-center items-center p-4">
    <div className="animate-spin ... h-12 w-12 border-t-2 border-b-2 border-blue-500" />
  </div>
);

export default LoadingSpinner;
