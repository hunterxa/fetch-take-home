import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { SelectedDogsContext } from '../../context/SelectedDogsContext'
import './dogcard.css'

function DogCard({ img, name, age, breed, zip, id }) {
  const { selectedDogs, setSelectedDogs } = useContext(SelectedDogsContext)
  const [selected, setSelected] = useState(selectedDogs.includes(id))

  function handleAdd() {
    setSelectedDogs(prevDogs => [...prevDogs, id])
    setSelected(true)
    console.log(selectedDogs)
  }

  function handleRemove() {
    setSelectedDogs(prevDogs => prevDogs.filter(dogId => dogId !== id))
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
          <p className="dog-card-age"><span className="medium">Age:</span> {age} years old</p>
          <p className="dog-card-zip"><span className="medium">Location:</span> {zip}</p>
        </div>
      </div>
      {selected
        ? <button className="dog-card-button" onClick={handleRemove}>Remove</button>
        : <button className="dog-card-button" onClick={handleAdd}>Add</button>
      }
    </div>
  )
}

DogCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  breed: PropTypes.string.isRequired,
  zip: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
}

export default DogCard