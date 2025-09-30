import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router'
import Calculate from './pages/formules.jsx'
import Error404 from './pages/error404.jsx'
import ManageFormules from './pages/manageFormules.jsx'
import Wiki from './pages/wiki.jsx'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404 />,
  },
  {
    path: '/calc',
    element: <Calculate />,
  },
  {
    path: '/manage',
    element: <ManageFormules />,
  },
  {
    path: '/wiki',
    element: <Wiki />,
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
)
