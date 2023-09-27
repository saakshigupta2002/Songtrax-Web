import React from 'react'
import { Link } from 'react-router-dom'

const apiKey = "U9szHIQzZ7"
const apiURL = "https://comp2140.uqcloud.net/api/"

async function getAllSamples(){
    const response = await fetch(`${apiURL}sample/?api_key=${apiKey}`)
    const responseJson = await response.json();
    return responseJson
}



const ShareSamples = () => {
  return (
    <main>
                <button>Back to Home</button>

        <h2 className="title">Share This Sample</h2>

        <div className="card">
            <div className="song-details">
                <h3>Sample Name</h3>
                <p>Date Created</p>
            </div>
            <div className="buttons">
                <Link href="#" className="bright-button" >Preview</Link>
            </div>
        </div>

        <div className="toggle-row-container">
            <div className="location-name-label">
                <h4>Location 1</h4>
            </div>
            <div className="sequence-row-container">
                <button className="toggle-selected" >Shared</button>
                <button className="toggle">Not Shared</button>
            </div>
        </div>

    </main>
  )
}

export default ShareSamples
