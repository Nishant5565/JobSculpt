import React, { useEffect, useRef, useState,useContext } from 'react';
import { Box, Avatar, Skeleton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ColorThief from 'colorthief';
import ThemeSwitcher from './ThemeSwitcher';
import { ThemeContext } from '../Pages/ThemeContext';


const ProfileSection = ({ user, handleOpen , size}) => {
  const [dominantColor, setDominantColor] = useState(null);
  const imageRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Function to calculate brightness of a color
  const calculateBrightness = (color) => {
    return (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
  };

  useEffect(() => {
    if (user?.profileImage && imageRef?.current) {
      const colorThief = new ColorThief();
      imageRef.current.onload = () => {
        const palette = colorThief.getPalette(imageRef.current, 10);
        const brightest = palette.reduce((prev, curr) => {
          return calculateBrightness(curr) > calculateBrightness(prev) ? curr : prev;
        });
        const darkest = palette.reduce((prev, curr) => {
          return calculateBrightness(curr) < calculateBrightness(prev) ? curr : prev;
        });
        setDominantColor(theme === 'dark' ? brightest : darkest);
      };
      if (imageRef.current.complete) {
        imageRef.current.onload();
      }
    }
  }, [user?.profileImage, theme]);

  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: size+10,
            height: size+10,
            borderRadius: '50%',
            background: `linear-gradient(135deg, rgb(${dominantColor?.[0]},${dominantColor?.[1]},${dominantColor?.[2]}) 0%, #dc2430 100%)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.5s',
          }}
        >
            {
              user?.profileImage == 'noImage' ? (
                <>
                <Avatar
                  sx={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                
                </>
              ):(
                <>
                <img
                alt={user?.userName}
                src={user?.profileImage}
                ref={imageRef}
                crossOrigin="anonymous"
                style={{
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
                </>
              )
            }
          <div
            onClick={handleOpen}
            style={{
              position: 'absolute',
              bottom: 10,
              right: 0,
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            className="themeTransition bg-[#fff] text-[#1f1f1f] rounded-full hover:bg-[#1f1f1f] hover:text-[#fff]"
          >
            <EditIcon />
          </div>
        </div>
        <h2
          className={`text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-black'
          } themeTransition`}
        >
          {user?.userName}
        </h2>
      </Box>
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
    </Box>
    </>
  );
};

export default ProfileSection;