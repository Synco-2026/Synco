import React from 'react';

export default function Button({ children, type = "button", onClick, className = "btn-dark", icon }) {
  return (
    <button 
      type={type} 
      onClick={onClick}
      className={`btn ${className} w-100 py-3 fw-bold rounded-3 shadow d-flex align-items-center justify-content-center gap-2`}
    >
      <span>{children}</span>
      {icon && <i className={icon}></i>}
    </button>
  );
}
