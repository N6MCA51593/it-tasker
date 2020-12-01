import React from 'react';

const ConfirmationPopUp = ({ handleConfirmation, togglePopUp }) => {
  return (
    <div className='confirmation-popup'>
      <h2>Are you sure?</h2>
      <div>
        <button onClick={() => handleConfirmation()}>Delete</button>
        <button onClick={() => togglePopUp()}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
