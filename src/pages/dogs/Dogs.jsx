import { redirect, useLoaderData, Link} from 'react-router-dom'
import { useState } from 'react'
import { findDogs, getDogs, getBreeds, getLocations } from '../../api/data'
import DogCard from '../../components/dogcard/DogCard'
import FilterBox from '../../components/filterbox/FilterBox'
import dogsPageImage from '../../assets/catch_dogs_page.png'
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
  const data = useLoaderData()
  const [selectedBreeds, setSelectedBreeds] = useState(data.selectedBreeds)
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
      <div className="dogs-page-info">
        <img className="dogs-page-image" src={dogsPageImage} alt="Dog" />
        <div>
          <h1>Select your favorites!</h1>
          <div className="horizontal-flex">
            <p>Add dogs to your favorites, and when you&#39;re ready</p>
            <Link to="/favorites" className="favorites-button">Find your Catch!</Link>
          </div>
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-box-container">
          <p>Filter breeds:</p>
          <FilterBox 
            options={data.breeds} 
            selectedOptions={selectedBreeds}
            setSelectedOptions={setSelectedBreeds}
          />
        </div>

        <div className="sorting">
          <div className="sort-by">
            <p>Sort by:</p>
            <input type="radio" name="sort-by" value="breed" checked={sortBy === "breed"} onChange={() => setSortBy("breed")}/>
            <label htmlFor="breed">Breed</label>
            <input type="radio" name="sort-by" value="age" checked={sortBy === "age"} onChange={() => setSortBy("age")}/>
            <label htmlFor="age">Age</label>
            <input type="radio" name="sort-by" value="name" checked={sortBy === "name"} onChange={() => setSortBy("name")}/>
            <label htmlFor="name">Name</label>
          </div>
          <div className="sort-order">
            <p>Sort order:</p>
            <input type="radio" name="sort-order" value="asc" checked={sortOrder === "asc"} onChange={() => setSortOrder("asc")}/>
            <label htmlFor="asc">Ascending</label>
            <input type="radio" name="sort-order" value="desc" checked={sortOrder === "desc"} onChange={() => setSortOrder("desc")}/>
            <label htmlFor="desc">Descending</label>
          </div>
        </div>
        <Link to={`/dogs?size=10&${buildFilterQuery()}`}>Apply Filters</Link>
      </div>

      <div className="dog-cards-container">{dogCards}</div>

      <div className="page-selection">
        {data.prev && <Link to={`/dogs/${data.prev.slice(12)}`}>{"<-Previous Page"}</Link>}
        {data.next && <Link to={`/dogs/${data.next.slice(12)}`}>{"Next Page ->"}</Link>}
      </div>

      <div className="log-out">
        <p>Done looking?</p>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  )
}