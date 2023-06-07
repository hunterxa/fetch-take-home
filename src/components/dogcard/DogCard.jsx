import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { SelectedDogsContext } from '../../context/SelectedDogsContext'
import './dogcard.css'

function DogCard({ img, name, age, breed, location, id }) {
  const { selectedDogs, setSelectedDogs } = useContext(SelectedDogsContext)
  const [selected, setSelected] = useState(selectedDogs.filter(dog => dog.id === id).length > 0)

  function handleAdd() {
    setSelectedDogs(prevDogs => [...prevDogs, {img, name, age, breed, location, id}])
    setSelected(true)
    console.log(selectedDogs)
  }

  function handleRemove() {
    setSelectedDogs(prevDogs => prevDogs.filter(dog => dog.id !== id))
    setSelected(false)
    console.log(selectedDogs)
  }

  return (
    <div className="dog-card">
      <img className="dog-card-image" src={img} alt={name} />
      <div className="dog-card-info">
        <div className="dog-card-top-info">
          <p className="dog-card-name">{name}</p>
          <p className="seperator">&#x2022;</p>
          <p className="dog-card-breed">{breed}</p>
        </div>
        <div className="dog-card-bottom-info">
          {!location.city && <p className="dog-card-zip"><span className="medium">Location:</span> {location.zip_code}</p>}
          {location.city && <p className="dog-card-location">{location.city}, {location.state} {location.zip_code}</p>}
          <p className="dog-card-age">{age} years old</p>
        </div>
      </div>
      {selected
        ? <button className="dog-card-button" onClick={handleRemove}>Remove from Favorites</button>
        : <button className="dog-card-button" onClick={handleAdd}>Add to Favorites</button>
      }
    </div>
  )
}

DogCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  breed: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

export default DogCard