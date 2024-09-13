import React, {useState, useEffect, useContext} from 'react';
import { Box, Toolbar, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HomeSection from './HomeSection';
import ThemeSwitcher from './ThemeSwitcher';
import { ThemeContext } from '../Pages/ThemeContext';
import api_call from '../Functions/api_call';

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [user, setUser] = useState({});
  const { theme } = useContext(ThemeContext);
  const {authuser} = api_call();

  useEffect(() => {
    const data = authuser().then((data) => {
        setUser(data);
        console.log(data);
    });
  }, []);

  return (
    <div className='pt-20'>
    <Box sx={{ display: 'flex' }}>

      <Box
      className='themeTransition'
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, backgroundColor:  theme == 'dark' ? 'black' : 'white' , minHeight: '100vh' }}
      >
        <Toolbar />
        {activeSection === 'Home' && <HomeSection theme = {theme} user ={user} />}
      </Box>
    </Box>
    </div>
  );
};

export default Dashboard;