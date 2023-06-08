import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectedDogsContext } from '../../context/SelectedDogsContext'
import DogCard from '../../components/dogcard/DogCard'
import { findMatch } from '../../api/data'
import favoritesImage from '../../assets/catch_favorites.png'
import './favorites.css'
import '../../App.css'

export async function loader() {
  return null
}

export default function Favorites() {
  const { selectedDogs, setSelectedDogs } = useContext(SelectedDogsContext)
  const navigate = useNavigate()

  async function handleMatch() {
    const ids = selectedDogs.map(dog => dog.id)
    findMatch(ids).then(res => {
        if (res.status === 401) {
          throw navigate('/?message=Please%20login%20to%20view%20that%20page')
        } else if (res.status !== 200) {
          throw new Error("Error finding match")
        }
        res.json().then(data => {
          setSelectedDogs([])
          navigate(`/match/${data.match}`)
        })
    })

  }

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
      <div className="favorites-page-info">
        <div className="favorites-page-info-text">
          <h1>Almost there!</h1>
          <p>Remove any dogs you might have changed you&#39;re mind on, and then find your catch!</p>
        </div>
        <img src={favoritesImage} className="favorites-page-image" />
      </div>

      {/*If no dogs have been selected show message to user*/}
      {selectedDogs.length === 0
        ? <h2 className="no-dogs-selected">You haven&#39;t selected any dogs yet!</h2>
        :
        <>
          <div className="match-button-container">
            <button className="match-button" onClick={handleMatch}>Find your catch!</button>
          </div>
          {dogCards && <div className="selected-dogs-container">{dogCards}</div>}
        </>
      }
    </div>
  )
}