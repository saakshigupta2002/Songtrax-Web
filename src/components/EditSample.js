import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import MusicPreview from './MusicPreview';
import * as Tone from 'tone';
import LoadingSpinner from './animations/LoadingSpinner';
import MusicSpinner from './animations/MusicSpinner';
import { fetchOneSample, postSample, editSample } from '../utils/apiRequests'


const apiKey = "U9szHIQzZ7"
const apiURL = "https://comp2140.uqcloud.net/api/"

// async function fetchOneSample(id) {
//     try {

//         const response = await fetch(`${apiURL}sample/${id}/?api_key=${apiKey}`)
//         const responseJson = await response.json();
//         return responseJson;
//     } catch (error) {
//         console.error("Error fetching sample: ", error)
//     }
// }

// async function postSample(type, name, recordingData) {
//     const postData = {
//         'type': type,
//         'name': name,
//         'recording_data': JSON.stringify(recordingData),
//         'api_key': apiKey
//     }
//     try {
//         const response = await fetch(`${apiURL}sample/?api_key=${apiKey}`, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(postData)
//         })
//         if (response.ok) {
//             return true
//         }
//         else {
//             return false
//         }
//         // const responseJson = await response.json();
//         // return responseJson
//     } catch (error) {
//         console.error("Error inserting data: ", error)
//         return false
//     }
// }

// async function editSample(id, type, name, recordingData) {
//     const updatedData = {
//         'id': id,
//         'api_key': apiKey,
//         'name': name,
//         'recording_data': JSON.stringify(recordingData),
//         'type': type
//     }
//     try {
//         const response = await fetch(`${apiURL}sample/${id}/?api_key=${apiKey}`, {
//             method: "PUT",
//             headers: {
//                 'Accept': "application/json",
//                 'Content-Type': "application/json"
//             },
//             body: JSON.stringify(updatedData)
//         })
//         if (response.ok) {
//             return true;
//         }
//         else {
//             return false;
//         }
//         // const responseJson = await response.json();
//         // return responseJson
//     } catch (error) {
//         console.error("Error editing Data", error)
//         return false
//     }
// }

const EditSample = () => {
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
    const [isPlaying, setIsPlaying] = useState(false);

    const [isNew, setIsNew] = useState(true)
    const [type, setType] = useState('guitar')
    const [name, setName] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isNoName, setIsNoName] = useState(false)


    const transport = Tone.Transport;

    const getUrl = useLocation()
    const searchParams = new URLSearchParams(getUrl.search)

    const [songId, setSongId] = useState(Number(searchParams.get('id')))

    const [recordingData, setRecordingData] = useState(emptyRecordingData)

    const handlePlaybackChange = (playing, index) => {
        setIsPlaying(playing);

    };
    const handleSubmit = async () => {
        setIsNoName(false);
        setIsError(false)
        setIsSubmitted(false)
        if (name === '') {
            setIsNoName(true);
            return
        }
        setIsLoading(true); // Set loading to true when the request is sent.
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


    const handleToggleButton = (note, index) => {
        const updatedRecordingData = [...recordingData]
        updatedRecordingData.forEach((data) => {
            if (data.hasOwnProperty(note)) {
                data[note][index] = !data[note][index]
            }
        })
        setRecordingData(updatedRecordingData)
    }

    useEffect(() => {
        async function fetchSong(songId) {
            try {
                const currentSong = await fetchOneSample(songId)
                setType(currentSong.type)
                setName(currentSong.name)
                setRecordingData(JSON.parse(currentSong.recording_data))


            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }
        if (songId) {
            setIsNew(false)
            fetchSong(songId)
        }
    }, [])


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
                    <button className={(type === 'guitar') ? 'toggle-selected' : 'toggle'} onClick={() => setType('guitar')}>Guitar</button>
                    <button className={(type === 'piano') ? 'toggle-selected' : 'toggle'} onClick={() => setType('piano')}>Piano</button>
                    <button className={(type === 'violin') ? 'toggle-selected' : 'toggle'} onClick={() => setType('violin')}>Violin</button>
                    <button className={(type === 'drums') ? 'toggle-selected' : 'toggle'} onClick={() => setType('drums')}>Drums</button>
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


            {/* <div className="toggle-row-container">
                <div className="row-label">
                    <h4>A</h4>
                </div>
                <div className="sequence-row-container">
                    <button className="toggle-selected"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle-selected"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle-selected"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle-selected"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                </div>
            </div> */}
        </main>
    )
}

export default EditSample
