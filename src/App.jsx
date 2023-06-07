import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import DefaultLayout from './layouts/default/DefaultLayout'

import './App.css'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      
    </Route> 
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
