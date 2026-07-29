import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: '#14161F',
          color: '#FAF9F6',
          fontSize: '13px',
          fontWeight: 500,
          borderRadius: '10px',
          padding: '12px 16px',
          border: '1px solid rgba(250,249,246,0.08)',
          boxShadow: '0 12px 32px -12px rgba(20,22,31,0.45)',
        },
        success: {
          iconTheme: { primary: '#3F7D58', secondary: '#FAF9F6' },
        },
        error: {
          iconTheme: { primary: '#B8483C', secondary: '#FAF9F6' },
        },
      }}
    />
  </StrictMode>,
)