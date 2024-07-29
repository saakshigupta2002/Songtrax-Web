import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="page-header">
      <div className="header-logo">
        {
          (location.pathname !== '/') &&
          <Link to="/" className="header-icon-link back-button-container">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" className='back-icon' viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
          </Link>
        }
        <h2>
          <Link to="/" className="header-icon-link">SongTrax</Link>
        </h2>
      </div>
      <div className="header-app-description">
        <span>Create & Share Location Based Music Samples!</span>
      </div>
    </header>
  )
}

export default Header
