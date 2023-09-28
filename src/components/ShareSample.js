import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const apiKey = "U9szHIQzZ7"
const apiURL = "https://comp2140.uqcloud.net/api/"

async function fetchOneSample(id) {
    try {
        const response = await fetch(`${apiURL}sample/${id}/?api_key=${apiKey}`)
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error("Error fetching sample: ", error)
    }
}

async function fetchAllLocations() {
    try {
        const response = await fetch(`${apiURL}location/?api_key=${apiKey}`)
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error("Error fetching sample: ", error)
    }
}

async function fetchAllSamplesToLocations() {
    try {
        const response = await fetch(`${apiURL}sampletolocation/?api_key=${apiKey}`)
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error("Error fetching sample: ", error)
    }
}

async function postSampleToLocation(sampleId, locationId) {
    const postData = {
        'api_key': apiKey,
        'sample_id': sampleId,
        'location_id': locationId,
    }
    try {
        const response = await fetch(`${apiURL}sampletolocation/?api_key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        const responseJson = await response.json();
        return responseJson
    } catch (error) {
        console.error("Error Sharing Sample: ", error)
    }
}
async function deleteSampleToLocation(id) {
    try {
        const response = await fetch(`${apiURL}sampletolocation/${id}/?api_key=${apiKey}`, {
            method: 'DELETE'
        })
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error("Error fetching sample: ", error)
    }
}
function convertToDate(datetimeString) {
    const dateTimeObject = new Date(datetimeString);
    const date = `${dateTimeObject.getFullYear()}-${dateTimeObject.getMonth() + 1}-${dateTimeObject.getDate()}`
    return date
}

const ShareSample = () => {
    const getUrl = useLocation()
    const searchParams = new URLSearchParams(getUrl.search)
    const [locations, setLocations] = useState([])
    const [sampleToLocations, setSampletoLocations] = useState(null)
    const sampleId = Number(searchParams.get('id'))
    const [currentSample, setCurrentSample] = useState({
        name: "Loading..",
        datatime: "Loading"
    })

    useEffect(() => {
        async function getAllData() {
            const responseData = await fetchOneSample(sampleId)
            setCurrentSample(responseData)

            const locationsData = await fetchAllLocations();
            setLocations(locationsData)

            const sampleToLocationData = await fetchAllSamplesToLocations()
            setSampletoLocations(sampleToLocationData)
            // console.log(sampleToLocations)

        }
        getAllData()
    }, [])

    // console.log("locations: ", locations)
    // console.log("samples to locations: ", sampleToLocations)

    return (
        <main>
            {/* <button>Back to Home</button> */}

            <h2 className="title">Share This Sample</h2>

            <div className="card">
                <div className="song-details">
                    <h3>{currentSample.name}</h3>
                    <p>{convertToDate(currentSample.datetime)}</p>
                </div>
                <div className="buttons">
                    <Link href="#" className="bright-button" >Preview</Link>
                </div>
            </div>
            {
                locations.map((location, LocationIndex) => {
                    console.log("Sample to Location:", sampleToLocations)
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
                                            if (!isShared)
                                                postSampleToLocation(currentSample.id, location.id)
                                        }}
                                    >
                                        Shared
                                    </button>
                                    <button className={!isShared ? "toggle-selected" : "toggle"}
                                        onClick={() => {
                                            if (isShared)
                                                deleteSampleToLocation(sampleToLocationsId)
                                        }}
                                    >
                                        Not Shared
                                    </button>
                                </div>
                            </div>)
                    }
                    else{
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
