import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import DefaultLayout from './layouts/default/DefaultLayout'
import Home, { loader as homeLoader, action as homeAction } from './pages/home/Home'
import Favorites from './pages/favorites/Favorites'
import Dogs, { loader as dogsLoader } from './pages/dogs/Dogs'
import './App.css'

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route
        index
        element={<Home />}
        loader={homeLoader}
        action={homeAction}
      />
      <Route
        path="dogs"
        element={<Dogs />}
        loader={dogsLoader}
      />
      <Route
        path="favorites"
        element={<Favorites />}
      />
    </Route> 
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
