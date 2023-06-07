import { useContext } from 'react'
import { SelectedDogsContext } from '../../context/SelectedDogsContext'
import DogCard from '../../components/dogcard/DogCard'
import favoritesImage from '../../assets/catch_favorites.png'
import './favorites.css'
import '../../App.css'

export async function loader() {
  return null
}

export default function Favorites() {
  const { selectedDogs } = useContext(SelectedDogsContext)

  const dogCards = selectedDogs.map(dog => {
      return (
        <DogCard
          key={dog.id}
          img={dog.img}
          age={dog.age}
          name={dog.name}
          breed={dog.breed}
          location={dog.location}
          id={dog.id}
        />
      )
    })

  return (
    <div className="favorites-page">
      <div className="horizontal-flex">
        <div className="favorites-page-info">
          <h1>Almost there!</h1>
          <p>Remove any dogs you might have changed you&#39;re mind on, and then find your catch!</p>
        </div>
        <img src={favoritesImage} className="favorites-page-image" />
      </div>
      <div className="match-button-container">
        <button className="match-button">Find your catch!</button>
      </div>
      {dogCards && <div className="selected-dogs-container">{dogCards}</div>}
    </div>
  )
}