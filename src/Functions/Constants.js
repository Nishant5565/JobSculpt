import { Link } from 'react-router-dom';

export const API_URL2 = 'https://jobsculptb.onrender.com';
export const API_URL1 = 'http://localhost:5000';
export const API_URL3 = 'https://v811xkq7-5000.inc1.devtunnels.ms';

export function API_URL() {
  const currentUrl = window.location.href;

  if (currentUrl.startsWith('https://v811xkq7-5173.inc1.devtunnels.ms/JobSculpt')) {
    return API_URL3;
  } else if (currentUrl.startsWith('http://localhost:5173/JobSculpt')) {
    return API_URL2;
  } else if (currentUrl.startsWith('https://nishant5565.github.io/JobSculpt')) {
    return API_URL2;
  } else {
    throw new Error('Unknown frontend route');
  }
}