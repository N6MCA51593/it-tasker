import React from 'react';

const EditingControls = ({ save, cancel }) => {
  return (
    <div className='editing-controls'>
      <button onClick={() => save()}>Save changes</button>
      <button onClick={() => cancel()}>Cancel changes</button>
    </div>
  );
};

export default EditingControls;
