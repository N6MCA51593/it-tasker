import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className='progress-bar-container'>
      <progress max='100' value={progress}></progress>
      <span>{Math.floor(progress) + '%'}</span>
    </div>
  );
};

export default ProgressBar;
