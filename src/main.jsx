import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {ThemeContextProvider} from './Pages/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <GoogleOAuthProvider clientId="624213799832-gu82n31foqn2gpa0hf0u1i476m9c738q.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </ThemeContextProvider>,
)
