import { useRouteError } from 'react-router-dom'
import './error.css'

export default function Error() {
  const error = useRouteError
  console.error(error)

  return (
    <div className="error-page">
      <h1 className="error-message">Oops!</h1>
      <p><em>{error.message}</em></p>
      <p>Please refresh and try again!</p>
    </div>
  )
}