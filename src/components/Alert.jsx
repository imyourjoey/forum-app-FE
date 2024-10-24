// src/components/Alert.js
import React from "react";

const Alert = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="toast toast-top toast-center fixed top-0">
      <div className="alert alert-info bg-secondary shadow-md">
        <span>{message}</span>
        <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default Alert;
