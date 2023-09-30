
const apiKey = "U9szHIQzZ7"
const apiURL = "https://comp2140.uqcloud.net/api/"

//Fetch all the music samples from API
export async function fetchAllSamples() {
    const response = await fetch(`${apiURL}sample/?api_key=${apiKey}`)
    const responseJson = await response.json();
    return responseJson
}

//Fetch one of the music samples from API by ID
export async function fetchOneSample(id) {
    try {

        const response = await fetch(`${apiURL}sample/${id}/?api_key=${apiKey}`)
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error("Error fetching sample: ", error)
    }
}

//Post a new sample to API
export async function postSample(type, name, recordingData) {
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
        if (response.ok) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.error("Error inserting data: ", error)
        return false
    }
}

//Edit a sample to API
export async function editSample(id, type, name, recordingData) {
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
        if (response.ok) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Error editing Data", error)
        return false
    }
}


//Fetch all the locations from API
export async function fetchAllLocations() {
    try {
        const response = await fetch(`${apiURL}location/?api_key=${apiKey}`)
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error("Error fetching sample: ", error)
    }
}

//Fetch all samples shared to locations
export async function fetchAllSamplesToLocations() {
    try {
        const response = await fetch(`${apiURL}sampletolocation/?api_key=${apiKey}`)
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error("Error fetching sample: ", error)
    }
}

//Share sample to a Location
export async function postSampleToLocation(sampleId, locationId) {
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

//Delete or Un-share a sample from location
export async function deleteSampleToLocation(id) {
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

//Convert a datetime object to date string for easy reading
export function convertToDate(datetimeString) {
    const dateTimeObject = new Date(datetimeString);
    const date = `${dateTimeObject.getFullYear()}-${dateTimeObject.getMonth() + 1}-${dateTimeObject.getDate()}`
    return date
}