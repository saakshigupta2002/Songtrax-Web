import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const apiKey = "U9szHIQzZ7"
const apiURL = "https://comp2140.uqcloud.net/api/"

async function getAllSamples() {
    const response = await fetch(`${apiURL}sample/?api_key=${apiKey}`)
    const responseJson = await response.json();
    return responseJson
}

function convertToDate(datetimeString) {
    const dateTimeObject = new Date(datetimeString);
    const date = `${dateTimeObject.getFullYear()}-${dateTimeObject.getMonth() + 1}-${dateTimeObject.getDate()}`
    return date
}


const ListSamples = () => {
    const [songs, setSongs] = useState([])

    async function previewMusic(){
console.log("Playing music")
    }

    
    useEffect(() => {
        async function fetchSamples() {

            try {
                const allSamples = await getAllSamples();
                setSongs(allSamples);
            }
            catch (error) {
                setSongs([]);
                console.log("error fetching Data", error)
            }
        }
        fetchSamples()
    }, [])
    // const songs = await getAllSamples()
    return (
        <main>
            <h2 className="title">My Songs</h2>
            <div className="create-card">
                <Link to="/edit-sample" className="full-button">Create Sample</Link>
            </div>
            <section className="sample">
                {
                    songs.map((song, index) => (

                        <div className="card" key={index}>
                            <div className="song-details">
                                <h3>{song.name}</h3>
                                <p>{convertToDate(song.datetime)}</p>
                            </div>
                            <div className="button-group-container">
                                <Link to={`/share-sample?id=${song.id}`} className="dark-button">Share</Link>
                                <Link to="" className="dark-button" onClick={previewMusic}>Preview</Link>
                                <Link to={`/edit-sample?id=${song.id}`} className="bright-button">Edit</Link>
                            </div>
                        </div>
                    ))
                }
            </section>

            <div className="create-card">
                <Link to="/edit-sample" className="full-button">Create Sample</Link>
            </div>
        </main>
    )
}

export default ListSamples
