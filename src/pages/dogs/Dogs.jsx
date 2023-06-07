import { 
  redirect, 
  useLoaderData, 
  useNavigate,
  Link,
  useParams
} from 'react-router-dom'
import { useState, useContext } from 'react'
import { findDogs, getDogs, getBreeds } from '../../api/dogs'
import { logout } from '../../api/auth'
import { SelectedDogsContext } from '../../context/SelectedDogsContext'
import DogCard from '../../components/dogcard/DogCard'
import FilterBox from '../../components/filterbox/FilterBox'
import '../../App.css'
import './dogs.css'

export async function loader({ request }) {
  const params = new URL(request.url).searchParams;
  const findDogsRes = await findDogs(params);
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
    //Get breed names for filtering
    const getBreedsRes = await getBreeds();
    const getBreedsData = await getBreedsRes.json();
    const selectedBreeds = params.get("breeds") //get already selected breeds from the url
    return { 
      dogs: getDogsData, 
      breeds: getBreedsData, 
      selectedBreeds: selectedBreeds, 
      next: findDogsData.next, 
      prev: findDogsData.prev 
    }
  } else {
    //If the request fails throw an error so that the error boundary is displayed
    console.log("Error finding dogs", findDogsRes.status)
    throw new Error("Error finding dogs")
  }
}

export default function Dogs() {
  const navigate = useNavigate()
  const data = useLoaderData()
  const params = useParams();
  const [logoutError, setLogoutError] = useState(null)
  const { selectedDogs } = useContext(SelectedDogsContext)
  const [selectedBreeds, setSelectedBreeds] = useState(data.selectedBreeds ? data.selectedBreeds : [])

  function buildBreedFilterQuery() {
    let breedQuery = "";
    selectedBreeds.forEach(breed => {
      breedQuery += `breeds=${breed}&`
    })
    return breedQuery;
  }

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
      <p className="selected-dogs">You have selected {selectedDogs.length} dogs</p>

      <FilterBox 
        options={data.breeds} 
        selectedOptions={selectedBreeds}
        setSelectedOptions={setSelectedBreeds}
      />
      <Link to={`/dogs?size=10&${buildBreedFilterQuery()}`}>Apply Filters</Link>

      <div className="dog-cards-container">{dogCards}</div>

      <div className="logout-container">
        {logoutError && <p>{logoutError}</p>}
        <div className="horizontal-flex">
          <p className="logout-prompt">Done looking?</p><button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}