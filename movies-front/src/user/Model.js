import React from 'react';

const ModalScreen = ({ show, onClose, onConfirm, title }) => {
//   if (!show) return null;

  return (
    <div className='model' >
      <div className="modal-content">
        <h1> Movie:{title}</h1>
        <p>Are you sure you want to delete this item?</p>
        <div className="modal-actions">
             <button className='btn' onClick={onConfirm}>Yes</button>
          <button className='btn' onClick={onClose}>No</button>
         
        </div>
      </div>
    </div>
  );
};

export default ModalScreen;
