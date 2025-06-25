import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'aos/dist/aos.css';
import Aos from 'aos';



Aos.init();

import {
  RouterProvider,
} from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './contexts/AuthProvider/AuthProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)
