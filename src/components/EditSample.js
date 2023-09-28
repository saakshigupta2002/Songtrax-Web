import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const apiKey = "U9szHIQzZ7"
const apiURL = "https://comp2140.uqcloud.net/api/"

async function getOneSample(id) {
    try{

        const response = await fetch(`${apiURL}sample/${id}/?api_key=${apiKey}`)
        const responseJson = await response.json();
        return responseJson;
    }catch(error){
        console.log("Error fetching sample: ", error)
    }
}

async function postSample(type, name, recordingData) {
    const postData = {
        'type': type,
        'name': name,
        'recording_data': JSON.stringify(recordingData),
        'api_key': apiKey
    }
    try {
        const response = await fetch(`${apiURL}sample/?api_key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        const responseJson = await response.json();
        return responseJson
    }catch (error){
        console.log("Error inserting data: ", error)
    }
}

async function editSample(id, type, name, recordingData) {
    const updatedData = {
        'id': id,
        'api_key': apiKey,
        'name': name,
        'recording_data': JSON.stringify(recordingData),
        'type': type
    }
    try {
        const response = await fetch(`${apiURL}sample/${id}/?api_key=${apiKey}`, {
            method: "PUT",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(updatedData)
        })
        const responseJson = await response.json();
        return responseJson
    } catch (error) {
        console.log("Error editing Data", error)
    }
}

const EditSample = () => {
    const getUrl = useLocation()
    const searchParams = new URLSearchParams(getUrl.search)
    const songId = Number(searchParams.get('id'))
    const [isNew, setIsNew] = useState(true)
    const [type, setType] = useState('drums')
    const [name, setName] = useState('')
    const [recordingData, setRecordingData] = useState([
        {
            "B": [true, false, false, false, false, false, false, false, false, false, false, false, false,
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
    ])

    const handleSubmit = () => {
        if(isNew){
            postSample(type,name,recordingData)
        }
        else{
            editSample(songId, type, name, recordingData)
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
                const currentSong = await getOneSample(songId)
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


    // console.log("recordingData",recordingData)
    return (
        <main>
            {/* <button>Back to Home</button> */}
            <h2 className="title">Edit Sample:</h2>
            <form className="card edit-card">
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                <div className="button-group-container">
                    <button type="button" className="bright-button" onClick={handleSubmit}>Save</button>
                </div>
            </form>

            <div className="toggle-row-container">
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
