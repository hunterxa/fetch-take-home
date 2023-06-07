import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Home, { action as homeAction } from './pages/home/Home'
import DefaultLayout from './layouts/default/DefaultLayout'

import './App.css'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route
        index
        element={<Home />}
        action={homeAction}
      />
    </Route> 
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
