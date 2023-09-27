import React from 'react'
import { Link } from 'react-router-dom'

const ListSamples = () => {
  return (
    <main>
        <h2 class="title">My Songs</h2>

        <section class="sample">
            <div class="card">
                <div class="song-details">
                    <h3>Song Name</h3>
                    <p>Date Created</p>
                </div>
                <div class="button-group-container">
                    <Link to="/edit-sample" class="bright-button">Edit</Link>
                </div>
            </div>
        </section>

        <div class="create-card">
            <Link to="/create-sample" class="full-button">Create Sample</Link>
        </div>
    </main>
  )
}

export default ListSamples
