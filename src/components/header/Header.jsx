import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {

  return (
    <header>
      <Link to="/" className="header-title">Catch</Link>
      <Link to="/about" className="header-link">About</Link>
      <Link to="/dogs?size=10&sort=breed:asc" className="header-link">See the dogs!</Link>
    </header>
  )
}