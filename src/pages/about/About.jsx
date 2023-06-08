import { Link } from 'react-router-dom'
import aboutImage from '../../assets/catch_about.png'
import './about.css'

export default function About() {
  return (
    <div className="about-page">
      <div>
        <h1 className="about-title">About</h1>
        <p className="about-text">Find the perfect dog for you to adopt with Catch!</p>
        <p className="about-text">Once your signed in head over to the <Link className="about-link" to="/dogs?size=10&sort=breed:asc">dogs</Link> page and find your favorites!</p>
        <p className="about-text">Once you&#39;ve added all of the dogs you love to your favorites, hit &#34;Find your Catch!&#34; to go review all of the dogs you&#39;ve favorited.</p>
        <p className="about-text">You can remove any dog&#39;s you may have changed your mind on and then hit &#34;Find your Catch!&#34; again to find the perfect dog for you to adopt!</p>
      </div>
      <div>
        <img src={aboutImage} alt="Dog running on the beach" className="about-image" />
      </div>
    </div>
  )
}