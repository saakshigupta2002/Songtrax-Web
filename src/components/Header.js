import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="page-header">
            <div className="header-logo">
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
