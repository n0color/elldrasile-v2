import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router'
import Calculate from './pages/formules.jsx'
import Error404 from './pages/error404.jsx'
import ManageFormules from './pages/manageFormules.jsx'
const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <Error404 />,
  },
  {
    path: '/calc',
    element: <Calculate />,
    // errorElement: <Error404 />,
  },
  {
    path: '/manage',
    element: <ManageFormules />,
    // errorElement: <Error404 />,
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
)
