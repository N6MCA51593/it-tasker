import FormContainer from 'features/landing/FormContainer';
import React from 'react';
import image from 'features/landing/pic.jpg';

const LandingPage = () => {
  return (
    <div className='landing'>
      <div className='landing-container'>
        <div className='img-container'>
          <div className='img-text'>
            <h1>IT Task Manager</h1>
            <h2>
              Interactive workplace plan builder and task tracker for IT
              professionals
            </h2>
          </div>
          <img src={image} alt='pic' />
        </div>
        <FormContainer />
      </div>
    </div>
  );
};

export default LandingPage;
