import React from 'react';

export default function SecurityBadge({ text = "Acceso Seguro Restringido • Nodo Medellín" }) {
  return (
    <div className="text-center mb-3">
      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold small shadow-sm">
        <i className="fa-solid fa-shield-halved me-1 text-primary"></i> {text}
      </span>
    </div>
  );
}
