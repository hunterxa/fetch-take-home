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
import Match, { loader as matchLoader } from './pages/match/Match'
import Logout, { loader as logoutLoader } from './pages/logout/Logout'
import About from './pages/about/About'
import Error from './components/error/Error'
import './App.css'

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route
        index
        element={<Home />}
        loader={homeLoader}
        action={homeAction}
        errorElement ={<Error />}
      />
      <Route
        path="about"
        element={<About />}
        errorElement ={<Error />}
      />
      <Route
        path="dogs"
        element={<Dogs />}
        loader={dogsLoader}
        errorElement ={<Error />}
      />
      <Route
        path="favorites"
        element={<Favorites />}
        errorElement ={<Error />}
      />
      <Route
        path="match/:matchId"
        element={<Match />}
        loader={matchLoader}
        errorElement={<Error />}
      />
      <Route
        path="logout"
        element={<Logout />}
        loader={logoutLoader}
        errorElement={<Error />}
        />
    </Route> 
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
