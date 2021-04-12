import Container from 'features/landing/Container';
import React from 'react';
import image from 'features/landing/pic.jpg';

const LandingPage = () => {
  return (
    <div className='landing'>
      <div className='landing-container'>
        <div className='img-container'>
          <div className='img-text'>
            <h1>IT task manager</h1>
            <h2>
              Interactive workplace map and task tracker for IT professionals
            </h2>
          </div>
          <img src={image} alt='pic' />
        </div>
        <Container />
      </div>
    </div>
  );
};

export default LandingPage;
