import { 
  redirect, 
  useLoaderData, 
  useNavigate,
  Link
} from 'react-router-dom'
import { useState, useContext } from 'react'
import { findDogs, getDogs, getBreeds, getLocations } from '../../api/data'
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
    const findDogsData = await findDogsRes.json()
    const getDogsRes = await getDogs(findDogsData.resultIds)
    const getDogsData = await getDogsRes.json()
    //Get breed names for filtering
    const getBreedsRes = await getBreeds()
    if (getBreedsRes.status !== 200) {
      throw new Error("Error retrieving list of breeds")
    }
    const getBreedsData = await getBreedsRes.json()
    //Get the locations of the dogs
    const getLocationsRes = await getLocations(getDogsData.map(dog => dog.zip_code))
    if (getLocationsRes.status !== 200) {
      throw new Error("Error retrieving list of locations")
    }
    const getLocationsData = await getLocationsRes.json()

    return { 
      dogs: getDogsData,
      breeds: getBreedsData,
      locations: getLocationsData,
      next: findDogsData.next, 
      prev: findDogsData.prev,
      selectedBreeds: params.getAll('breeds'),
      sortBy: params.get('sort')
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
  const [logoutError, setLogoutError] = useState(null)
  const { selectedDogs } = useContext(SelectedDogsContext)
  const [selectedBreeds, setSelectedBreeds] = useState(data.selectedBreeds ? data.selectedBreeds : [])
  const [sortBy, setSortBy] = useState(data.sortBy.split(':')[0] || "breed")
  const [sortOrder, setSortOrder] = useState(data.sortBy.split(':')[1] || "asc")

  function buildFilterQuery() {
    let filterQuery = "";
    if (selectedBreeds.length > 0) {
      selectedBreeds.forEach(breed => {
        filterQuery += `breeds=${breed}&`
      }) 
    }
    return filterQuery + `sort=${sortBy}:${sortOrder}`;
  }

  async function handleLogout() {
    const res = await logout();
    if (res.status === 200) {
      console.log("Logout successful");
      navigate("/?message=Logout%20successful");
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
          // Some zips do not have a location, in this case just return the zip code
          location={data.locations.find(location => location && location.zip_code === dog.zip_code) || {zip_code: dog.zip_code}}
          id={dog.id}
        />
      )
    })
  }

  return (
    <div className="dogs-page">
      <p className="selected-dogs">You have selected {selectedDogs.length} dogs</p>
      <p className="selected-dogs">You have selected {selectedBreeds.length} breeds</p>
      {console.log("selected breeds", selectedBreeds)}

      <FilterBox 
        options={data.breeds} 
        selectedOptions={selectedBreeds}
        setSelectedOptions={setSelectedBreeds}
      />

      <div className="sort-by">
        <input type="radio" name="sort-by" value="breed" checked={sortBy === "breed"} onChange={() => setSortBy("breed")}/>
        <label htmlFor="breed">Breed</label>
        <input type="radio" name="sort-by" value="age" checked={sortBy === "age"} onChange={() => setSortBy("age")}/>
        <label htmlFor="age">Age</label>
      </div>
      <Link to={`/dogs?size=10&${buildFilterQuery()}`}>Apply Filters</Link>

      <div className="dog-cards-container">{dogCards}</div>
      <div className="page-selection">
        {data.prev && <Link to={`/dogs?size=10&${buildFilterQuery()}&page=${data.prev}`}>{"<-Back"}</Link>}
        {data.next && <Link to={`/dogs?size=10&${buildFilterQuery()}&page=${data.next}`}>{"Next->"}</Link>}
      </div>

      <div className="bottom-option">
        <div>
          <Link to="/selected">View Your Selected Dogs</Link>
        </div>
        <div className="logout-container">
          {logoutError && <p>{logoutError}</p>}
          <div className="horizontal-flex">
            <p className="logout-prompt">Done looking?</p><button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}