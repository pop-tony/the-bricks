import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from './context/ThemeContext'
import DesktopScaleWrapper from './DesktopScaleWrapper';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <Toaster richColors position="top-center" />
      <DesktopScaleWrapper>
        <App />
      </DesktopScaleWrapper>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
