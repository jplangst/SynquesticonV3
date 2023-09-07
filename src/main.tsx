//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Note that StrictMode renders all the components twice. This is the intended behaviour, but will cause problems for us. 
// Strict mode only renders twice in development mode. 

/* ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
 */

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)