import React from 'react';
import BackgroundImage from '../assets/Images/BackgroundImage3.jpg';
import LogoNoBg from '../assets/Images/LogoNoBg.png';

const LandingPage = () => {
  return (
    <>
      <div
        style={{
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
          <span className="font-greatvibes">
              J
            </span>
            ob
            <span className=' font-greatvibes'>
              S
            </span>
            culpt
          </h1>
          <p className="text-2xl font-light mb-8 animate__animated animate__fadeIn animate__delay-2s">
            Craft Your Career, Shape Your Team.
          </p>
          <a
            href="#explore"
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[25px] animate__animated animate__fadeIn animate__delay-3s "
          >
            Explore More
          </a>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
