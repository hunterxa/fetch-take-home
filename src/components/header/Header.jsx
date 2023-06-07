import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {
  return (
    <header>
      <Link to="/" className="header-title">Catch</Link>
    </header>
  )
}