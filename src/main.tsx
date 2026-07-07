import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { routerBasePath } from './services/config.ts'

import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={routerBasePath}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
