import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import AppAdvanced from './AppAdvanced.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppAdvanced />
  </StrictMode>,
)
