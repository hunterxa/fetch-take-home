import { redirect, useLoaderData, Link } from 'react-router-dom'
import { getDogs } from '../../api/data'
import './match.css'

export async function loader({ params }) {
  console.log('params matchId', params.matchId)
  if (!params.matchId) {
    return {message: "You don't have a match yet! Go find your catch!"}
  }

  const res = await getDogs([params.matchId])
  if (res.status === 401) {
    throw redirect('/?message=Please%20login%20to%20view%20that%20page')
  } else if (res.status !== 200) {
    throw new Error("Error finding match")
  }
  const matchData  = await res.json()
  return matchData[0]
}

export default function Match() {
  const data = useLoaderData()
  
  if (data.message) {
    return (
      <div className="no-match-message">{data.message}</div>
    )
  }

  return (
    <div className="match-page">
      <h1 className="match-title">You found your catch!</h1>
      <img className="match-image" src={data.img} />
      <h1 className="match-name">{data.name}</h1>
      <p className="match-info"><i>{data.breed}</i></p>
      <p className="match-info">{data.age < 1 ? "less than a year old" : `${data.age} years old`}</p>
      <div className="go-again-container">
        <p className="go-again-text">Want another catch?</p>
        <Link to="/dogs?size=10&sort=breed:asc" className="go-again-link">Find another!</Link>
      </div>
    </div>
  )
}