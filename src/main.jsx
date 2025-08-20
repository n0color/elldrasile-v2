import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router'
import Calculate from './pages/formules.jsx'
const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: 
  },
  {
    path: '/calc',
    element: <Calculate />,
    // errorElement: 
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
)
