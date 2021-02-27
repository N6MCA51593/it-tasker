import React from 'react';

const EditingControls = ({ save, cancel }) => {
  return (
    <div className='editing-controls'>
      <button className='btn primary tasker-edit' onClick={() => save()}>
        <span></span>
        Save
      </button>
      <button className='button-secondary' onClick={() => cancel()}>
        Cancel
      </button>
    </div>
  );
};

export default EditingControls;
