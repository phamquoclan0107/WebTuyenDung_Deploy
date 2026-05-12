import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'

import App from './App.jsx'
import './index.css'

// AuthProvider đã được bọc trong App.jsx → KHÔNG bọc lại ở đây
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#13161e',
              color: '#f0f2f8',
              border: '1px solid #232736',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#3ecf8e',
                secondary: '#13161e',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#13161e',
              },
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)