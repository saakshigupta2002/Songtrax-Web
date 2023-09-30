import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import MusicPreview from './MusicPreview';
import * as Tone from 'tone';
import LoadingSpinner from './animations/LoadingSpinner';
import MusicSpinner from './animations/MusicSpinner';
import { fetchOneSample, postSample, editSample } from '../utils/apiRequests'


const EditSample = () => {
    
    //States to keep track of music playing and initial loading
    const [isInitialLoading, setInitialLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const [isNew, setIsNew] = useState(true) //if new sample is to be created or existing to be edited
    const [type, setType] = useState('guitar') //Type of instrument (guitar by default)
    const [name, setName] = useState('') 

    //States to keep track of form submission and showing alerts
    const [isSubmitted, setIsSubmitted] = useState(false) 
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isNoName, setIsNoName] = useState(false)
    
    
    const transport = Tone.Transport;
    
    //Get the id of current sample to be edited (if any) from URL bar
    const getUrl = useLocation()
    const searchParams = new URLSearchParams(getUrl.search)
    const songId = Number(searchParams.get('id'))
    
    //initial empty recording data as placeholder
    const emptyRecordingData = [
        {
            "B": [false, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false]
        },
        {
            "A": [false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false]
        },
        {
            "G": [false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false]
        },
        {
            "F": [false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false]
        },
        {
            "E": [false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false]
        },
        {
            "D": [false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false]
        },
        {
            "C": [false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, false]
        }
    ]
    const [recordingData, setRecordingData] = useState(emptyRecordingData)

    //handle when preview button is clicked
    const handlePlaybackChange = (playing, index) => {
        setIsPlaying(playing);

    };

    //handle when sample save button is clicked
    const handleSubmit = async () => {
        setIsNoName(false);
        setIsError(false)
        setIsSubmitted(false)
        if (name === '') {
            setIsNoName(true);
            return
        }
        setIsLoading(true); 
        try {
            if (isNew) {
                const response = await postSample(type, name, recordingData)
                console.log(response)
                if (response) {

                    setIsSubmitted(true)
                    setRecordingData(emptyRecordingData)
                    setName('')
                    setType('guitar')
                }
                else
                    setIsError(true)
            }
            else {
                const response = await editSample(songId, type, name, recordingData)
                if (response)
                    setIsSubmitted(true)
                else
                    setIsError(true)
            }
        } catch (error) {
            console.log("Error Submitting Sample: ", error)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    //handle when a music button is clicked
    const handleToggleButton = (note, index) => {
        const updatedRecordingData = [...recordingData]
        updatedRecordingData.forEach((data) => {
            if (data.hasOwnProperty(note)) {
                data[note][index] = !data[note][index]
            }
        })
        setRecordingData(updatedRecordingData)
    }

    //Fetch current song data which is to be edited by calling api function
    async function fetchSong(songId) {
        try {
            const currentSong = await fetchOneSample(songId)
            setType(currentSong.type)
            setName(currentSong.name)
            setRecordingData(JSON.parse(currentSong.recording_data))


        } catch (error) {
            console.error("Error fetching data: ", error)
        }
        setInitialLoading(false)
    }

    //Load current song when page loads initially
    useEffect(() => {
        
        setInitialLoading(true)
        if (songId) {
            setIsNew(false)
            fetchSong(songId)
        }
        else
        setInitialLoading(false)
    }, [])


    //Show loading when initial loading is in progress
    if(isInitialLoading){
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <main>
            {
                isSubmitted &&
                <div className="alert success-alert">
                    <strong>Success!{" "}</strong> Your sample has been submitted.
                </div>
            }
            {
                isError &&
                <div className="alert error-alert">
                    <strong>Error!{" "}</strong> Sample could not be submitted.
                </div>
            }
            {
                isNoName &&
                <div className="alert error-alert">
                    <strong>Error!{" "}</strong> Please fill the name of sample.
                </div>
            }
            <h2 className="title">Edit Sample:</h2>
            <form className="card edit-card">
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                {isPlaying &&
                    <MusicSpinner />
                }
                <div className="button-group-container">

                    <MusicPreview musicData={recordingData} instrumentName={type} transport={transport} onPlaybackChange={(playing) => handlePlaybackChange(playing)} />
                    {!isLoading ? <button type="button" className="bright-button" onClick={handleSubmit}>Save</button> : <button className='disabled-button' disabled>Save</button>}
                    {isLoading && <LoadingSpinner />}
                </div>
            </form>

            <div className="toggle-row-container instruments-row">
                <div className="row-label">
                    <h4>Instrument</h4>
                </div>
                <div className="sequence-row-container">
                    <button className={(type === 'guitar') ? 'toggle-selected' : 'toggle'} onClick={() => setType('guitar')} disabled={isPlaying}>Guitar</button>
                    <button className={(type === 'piano') ? 'toggle-selected' : 'toggle'} onClick={() => setType('piano')} disabled={isPlaying}>Piano</button>
                    <button className={(type === 'violin') ? 'toggle-selected' : 'toggle'} onClick={() => setType('violin')} disabled={isPlaying}>Violin</button>
                    <button className={(type === 'drums') ? 'toggle-selected' : 'toggle'} onClick={() => setType('drums')} disabled={isPlaying}>Drums</button>
                </div>
            </div>
            {
                recordingData.map((data, index) => {
                    const note = Object.keys(data)[0]
                    const values = data[note]
                    return (
                        <div className="toggle-row-container" key={index}>
                            <div className="row-label">
                                <h4>{note}</h4>
                            </div>
                            <div className="sequence-row-container">
                                {values.map((isTrue, indexButton) => (
                                    <button className={isTrue ? "toggle-selected" : "toggle"} key={indexButton} onClick={() => handleToggleButton(note, indexButton)}></button>

                                ))}
                            </div>
                        </div>
                    )
                })
            }
        </main>
    )
}

export default EditSample
