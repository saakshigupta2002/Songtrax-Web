import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header class="page-header">
            <div class="header-logo">
                <h2>
                    <Link to="/" class="header-icon-link">OgCiSum</Link>
                </h2>
            </div>
            <div class="header-app-description">
                <span>Create & Share Location Based Music Samples!</span>
            </div>
     </header>
  )
}

export default Header
