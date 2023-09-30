import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import MusicPreview from './MusicPreview'
import { fetchOneSample, fetchAllLocations, fetchAllSamplesToLocations, postSampleToLocation, convertToDate, deleteSampleToLocation } from '../utils/apiRequests'

import * as Tone from 'tone';
import MusicSpinner from './animations/MusicSpinner';
import LoadingSpinner from './animations/LoadingSpinner';


const ShareSample = () => {
    //keep track if music is playing or not
    const [isPlaying, setIsPlaying] = useState(false);

    //get song id from url bar
    const getUrl = useLocation()
    const searchParams = new URLSearchParams(getUrl.search)
    const sampleId = Number(searchParams.get('id'))
    
    //states to store current sample's data
    const [currentSample, setCurrentSample] = useState(null)
    const [musicData, setMusicData] = useState(null)

    const [locations, setLocations] = useState([])
    const [sampleToLocations, setSampletoLocations] = useState(null)

    //keep track of data submitting
    const [dataUpdated, setDataUpdated] = useState(0)
    const [toggleLoading, setToggleLoading] = useState(false)

    const transport = Tone.Transport;

    //handle when preview button is clicked
    const handlePlaybackChange = (playing, index) => {
        setIsPlaying(playing);

    };

    //Get all data of the current sample and its sharing data from APIs
    async function getAllData() {
        const responseData = await fetchOneSample(sampleId) //fetch current sample by ID
        setCurrentSample(responseData)

        const musicDataParse = JSON.parse(responseData.recording_data) //get current music data for previewing
        setMusicData(musicDataParse)

        const locationsData = await fetchAllLocations(); //get All locations
        setLocations(locationsData)

        const sampleToLocationData = await fetchAllSamplesToLocations() //get all sharing data
        setSampletoLocations(sampleToLocationData)

        setToggleLoading(false) //Loading and fetching data is complete
    }

    //fetch all the data from API when page first renders
    useEffect(() => {
        getAllData()
        
    }, [dataUpdated])


    //When data fetching / loading is in progress
    if (!currentSample) {
        return <h1>Loading...</h1>
    }
    return (
        <main>
            {console.log("loading: ", toggleLoading)}
            <h2 className="title">Share This Sample</h2>

            <div className="card">
                <div className="song-details">
                    <h3>{currentSample.name}</h3>
                    <p>{convertToDate(currentSample.datetime)}</p>
                </div>
                {isPlaying &&
                    <MusicSpinner />
                }
                {toggleLoading && <LoadingSpinner />}
                <div className="buttons">
                    <MusicPreview musicData={musicData} instrumentName={currentSample.type} transport={transport} onPlaybackChange={(playing) => handlePlaybackChange(playing)} />
                </div>
            </div>
            {
                locations.map((location, LocationIndex) => {
                    if (sampleToLocations !== null) {

                        const sharedData = sampleToLocations.find(
                            (sampleToLocation) => (sampleToLocation.sample_id === currentSample.id) && (sampleToLocation.location_id === location.id)
                        )
                        const isShared = sharedData !== undefined
                        const sampleToLocationsId = isShared ? sharedData.id : null
                        return (
                            <div className="toggle-row-container" key={LocationIndex}>
                                <div className="location-name-label">
                                    <h4>{location.name}</h4>
                                </div>
                                <div className="sequence-row-container">
                                    <button
                                        className={isShared ? "toggle-selected" : "toggle"}
                                        onClick={() => {
                                            setToggleLoading(true)
                                            if (!isShared)
                                                postSampleToLocation(currentSample.id, location.id)
                                            setDataUpdated(dataUpdated+1)
                                        }}
                                    >
                                        Shared
                                    </button>
                                    <button className={!isShared ? "toggle-selected" : "toggle"}
                                        onClick={() => {
                                            if (isShared)
                                            setToggleLoading(true)
                                                deleteSampleToLocation(sampleToLocationsId)
                                                setDataUpdated(dataUpdated+1)
                                        }}
                                    >
                                        Not Shared
                                    </button>
                                </div>
                            </div>)
                    }
                    else {
                        return (
                            <h1>Loading...</h1>
                        )
                    }
                })
            }
        </main>
    )
}

export default ShareSample
