import PropTypes from 'prop-types'
import './dogcard.css'

function DogCard({ img, name, age, breed, zip }) {
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
    </div>
  )
}

DogCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  breed: PropTypes.string.isRequired,
  zip: PropTypes.number.isRequired
}

export default DogCard