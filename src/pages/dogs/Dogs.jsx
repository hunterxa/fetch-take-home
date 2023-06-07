import { 
  redirect, 
  useLoaderData, 
  useNavigate,
} from 'react-router-dom'
import { useState, useContext } from 'react'
import { findDogs, getDogs } from '../../api/dogs'
import { logout } from '../../api/auth'
import { SelectedDogsContext } from '../../context/SelectedDogsContext'
import DogCard from '../../components/dogcard/DogCard'
import '../../App.css'
import './dogs.css'

export async function loader({ request }) {
  // const params = new URL(request.url).searchParams;
  const findDogsRes = await findDogs();
  //If request fails due to authorization, redirect to login page
  //Need to redirect right away as everything on this page requires authorization
  if (findDogsRes.status === 401) {
    return redirect('/?message=Please%20login%20to%20view%20this%20page')
  }

  //If successful request, get dog data from returned ID array
  if (findDogsRes.status === 200) {
    const findDogsData = await findDogsRes.json();
    const getDogsRes = await getDogs(findDogsData.resultIds)
    const getDogsData = await getDogsRes.json();
    return { dogs: getDogsData, next: findDogsData.next, prev: findDogsData.prev }
  } else {
    console.log("Error finding dogs", findDogsRes.status)
    return { error: "Error finding dogs" }
  }
}

export default function Dogs() {
  const navigate = useNavigate()
  const [logoutError, setLogoutError] = useState(null)
  const data = useLoaderData()

  const { selectedDogs } = useContext(SelectedDogsContext)

  async function handleLogout() {
    const res = await logout();
    if (res.status === 200) {
      console.log("Logout successful");
      navigate("/");
    } else {
      console.log("Logout failed", res.status)
      setLogoutError("Logout failed");
    }
  }

  //Turn dog data into DogCard components
  let dogCards = null;
  if (data.dogs) {
    dogCards = data.dogs.map(dog => {
      return (
        <DogCard
          key={dog.id}
          img={dog.img}
          name={dog.name}
          age={dog.age}
          breed={dog.breed}
          zip={dog.zip_code}
          id={dog.id}
        />
      )
    })
  }

  return (
    <div className="dogs-page">
      {selectedDogs && <p className="selected-dogs">You have selected {selectedDogs.length} dogs</p>}

      {/* Render dog cards if they exist */}
      {dogCards && <div className="dog-cards-container">{dogCards}</div>}


      <div className="logout-container">
        {logoutError && <p>{logoutError}</p>}
        <div className="horizontal-flex">
          <p className="logout-prompt">Done looking?</p><button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}