import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {

  return (
    <header>
      <Link to="/" className="header-title">Catch</Link>
      <Link to="/dogs?size=10" className="header-link">See the dogs!</Link>
    </header>
  )
}