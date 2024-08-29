import React from 'react';
import BackgroundImage from '../assets/Images/BackgroundImage3.jpg';
import LogoNoBg from '../assets/Images/LogoNoBg.png';

const LandingPage = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        <img
          src={LogoNoBg}
          width={150}
          alt="JobSculpt Logo"
          className="absolute top-20 right-5 brightness-125 contrast-125"
        />
        <div className="text-center">
          <h1 className="text-6xl font-bold leading-tight mb-4 animate__animated animate__fadeIn animate__delay-1s">
            JobSculpt
          </h1>
          <p className="text-2xl font-light mb-8 animate__animated animate__fadeIn animate__delay-2s">
            Craft Your Career, Shape Your Team.
          </p>
          <a
            href="#explore"
            className="explore_button"
          >
            Explore More
          </a>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
