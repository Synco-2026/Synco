import React from 'react';

export default function InputField({ label, type = "text", value, onChange, placeholder, icon, rightElement, note, readOnly = false }) {
  return (
    <div className="mb-3">
      {label && (
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label className="form-label fw-bold small text-uppercase text-secondary">{label}</label>
          {note && <small className="text-muted">{note}</small>}
        </div>
      )}
      <div className="input-group">
        {icon && (
          <span className="input-group-text bg-light border-end-0 text-muted rounded-start-3">
            <i className={icon}></i>
          </span>
        )}
        <input 
          type={type} 
          className={`form-control bg-light ${icon ? 'border-start-0 ps-0' : ''} ${rightElement ? 'border-end-0' : ''} shadow-none`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {rightElement}
      </div>
    </div>
  );
}
