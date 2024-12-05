import React, { useState } from 'react';
import errors from '../CSS/errors.gif';

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
      <button className="cl-button" onClick={onClose}>✖</button>
      <img alt="noti-icon" src={errors} width="120" className="modal-image"></img>
        <h2>ERROR!</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
