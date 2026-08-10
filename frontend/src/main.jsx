import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Monte l'application React dans l'element HTML ayant l'identifiant "root".
// StrictMode active des controles supplementaires utiles pendant le developpement.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
