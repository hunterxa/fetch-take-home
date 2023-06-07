import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import DefaultLayout from './layouts/default/DefaultLayout'
import Home, { action as homeAction } from './pages/home/Home'
import Dogs, { loader as dogsLoader } from './pages/dogs/Dogs'
import './App.css'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route
        index
        element={<Home />}
        action={homeAction}
      />
      <Route
        path="dogs"
        element={<Dogs />}
        loader={dogsLoader}
      />
    </Route> 
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
