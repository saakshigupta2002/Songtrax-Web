import React from 'react'
import { Link } from 'react-router-dom'

const ShareSamples = () => {
  return (
    <main>
        <h2 class="title">Share This Sample</h2>

        <div class="card">
            <div class="song-details">
                <h3>Sample Name</h3>
                <p>Date Created</p>
            </div>
            <div className="buttons">
                <Link href="#" class="bright-button" >Preview</Link>
            </div>
        </div>

        <div class="toggle-row-container">
            <div class="location-name-label">
                <h4>Location 1</h4>
            </div>
            <div class="sequence-row-container">
                <button class="toggle-selected" >Shared</button>
                <button class="toggle">Not Shared</button>
            </div>
        </div>

    </main>
  )
}

export default ShareSamples
