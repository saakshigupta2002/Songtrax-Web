import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MusicPreview from './MusicPreview'
import MusicSpinner from './animations/MusicSpinner'
import { fetchAllSamples, convertToDate } from '../utils/apiRequests'

import * as Tone from 'tone'

const ListSamples = () => {
    const [songs, setSongs] = useState([]) //State to store all the songs from API
    const [isFetched, setIsFetched] = useState(false)  
    const [isPlaying, setIsPlaying] = useState(false) 
    
    const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null) //keep track of which song is playing

    const transport = Tone.Transport

    //handle when preview button is clicked
    const handlePlaybackChange = (playing, index) => {
        setIsPlaying(playing);
        if (playing) {
            setCurrentlyPlayingIndex(index)
        } else {
            setCurrentlyPlayingIndex(null)
        }
    }

    //function to fetch all samples / songs by calling api function
    async function fetchSamples() {

        try {
            const allSamples = await fetchAllSamples()
            setSongs(allSamples)
        }
        catch (error) {
            setSongs([])
            console.log("error fetching Data", error)
        }
        setIsFetched(true)
    }

    //Load all samples when page renders first
    useEffect(() => {
        
        fetchSamples()
    }, [])


    //When data is still not fetched completely
    if(!isFetched){
        return (
            <h1>Loading Data...</h1>
        )
    }

    return (
        <main>
            <h2 className="title">My Songs</h2>
            <div className="create-card">
                <Link to="/edit-sample" className="full-button">Create Sample</Link>
            </div>
           
            <section className="sample">
                {
                    songs.map((song, index) => {
                        const musicData = JSON.parse(song.recording_data)
                        return (
                            <div className="card" key={index}>
                                <div className="song-details">
                                    <h3>{song.name}</h3>
                                    <p>{convertToDate(song.datetime)}</p>
                                </div>
                                {
                                     (isPlaying && (currentlyPlayingIndex === index)) &&
                                    <MusicSpinner />
                                }
                                <div className="button-group-container">
                                  
                                    {
                                        ((currentlyPlayingIndex === index) || (currentlyPlayingIndex === null)) &&
                                        <MusicPreview musicData={musicData} instrumentName={song.type} transport={transport} onPlaybackChange={(playing) => handlePlaybackChange(playing, index)} />
                                    }
                                    {
                                        ((currentlyPlayingIndex !== index) && (currentlyPlayingIndex !== null)) &&
                                        <button className='disabled-button'  disabled>Preview</button>
                                    }
                                    <Link to={`/edit-sample?id=${song.id}`} className="bright-button">Edit</Link>
                                    <Link to={`/share-sample?id=${song.id}`} className="dark-button">Share</Link>
                                </div>
                            </div>)
                    })
                }
            </section>

            <div className="create-card">
                <Link to="/edit-sample" className="full-button">Create Sample</Link>
            </div>
        </main>
    )
}

export default ListSamples
