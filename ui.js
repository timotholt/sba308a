export { uiInit, isUiInitDone }
import { fetchGeolocation, getZipcode } from "./ip/getip.js";
import { getStateCodeByZipcode } from "./zipcode/zipcode-convert.js";
import { zipApiGetCityFromZip } from "./zipcode/extapi-zipapi.js";
import { setStatusMessage } from "./statusmessage.js";

import { petCardInit, makePetCard } from "./petcard.js";
import { getStateName } from "./usmap/usmap.js";

import { jsonSiloGetUsersByState } from "./simulate/jsonsilo.js";

let uiBooted = false;

// let lastSpecies  = -1;
// let lastBreed    = -1;
// let lastMiles    = -1;
// let lastZipcode  = -1;

// let species = null;
// let breed = null;
// let miles = null;
// let zipCode = null;

// async function statusCodeMonitor() {

//     // If anything has changed...
//     if (species != lastSpecies || breed != lastBreed || miles != lastMiles || zipCode != lastZipcode) {

//         await fetchGeolocation();
//     }

//     // Come back a second later and check again
//     setTimeout(statusCodeMonitor, 1000);
// }

function isUiInitDone() {
    return (uiBooted);
}

async function uiInit() {

    if (!uiBooted) {

        // Fill in the zip code box with GeoLocation
        await autofillZipcode();        
        uiBooted = true;

        // Attach event listener to zip code box
        document.getElementById("zipInput").addEventListener("change", zipCodeMonitor, false);

        // THIS MIGHT BREAK THE WHOLE APP   
        // Attach event listener to US map
        document.getElementById("mapOfUsa").addEventListener("click", usMapMonitor, false);

        // Start status code monitor
        // setTimeout(statusCodeMonitor, 1000);
    }
}

async function usMapMonitor(event) {

    let stateName;
    let stateAbbrev;

    //=========================================

    // Only process <a> events
    // if (event.target.tagName !== "A") {
    //     return;
    // }


    // If the ID of the element has a 2 character name
    if (event.target.dataset?.id?.length !== 2)
        return;

    stateAbbrev = event.target.dataset.id;

    // If the ID isn't the list of states
    stateName = getStateName(stateAbbrev);
    if (stateName === null) {
        return;
    }

    // Fetch users in the state
    let searchResult = jsonSiloGetUsersByState(stateAbbrev, 50);

    // Find the DIVs to output results
    let rm = document.getElementById("resultMessage");
    let rc = document.getElementById("resultContainer");

    // Remove all previous animals in the result area
    document.getElementById("resultContainer").innerHTML = "";

    // If we found no users...
    if (searchResult.length === 0) {

        // Let the user know
        rm.innerHTML = "No animals in our database found for the state of " + getStateName(event.target.id);
        return;
    }

    // Let the user know how many we found
    rm.innerHTML = `Returning ${searchResult.count} of ${searchResult.maxCount} animals in ` + stateName;

    // Then add each pet to the result area
    for (let i = 0; i < searchResult.count; i++) {

        // "GUID": "96854f95-5dc1-40ea-9f8f-6a9cc75c7aca",
        // "GivenName": "Kristen",
        // "Surname": "Gentry",
        // "Gender": "female",
        // "City": "Stlouis",
        // "State": "MO",
        // "ZipCode": "63101",
        // "EmailAddress": "KristenBGentry@teleworm.us",
        // "TelephoneNumber": "314-914-4762"

        let newPetCard = makePetCard(
                                searchResult.users[i].petName,
                                `<img src="https://cataas.com/cat?type=square&fit=cover&position=center&width=80&height=80" loading="lazy">`, //image,
                                searchResult.users[i].City + ", " + searchResult.users[i].State,
                                "awesome breed*", // breed,
                                searchResult.users[i].petDescription, // "awesome kitty*", //description,
                                searchResult.users[i].GivenName,
                                searchResult.users[i].TelephoneNumber, searchResult.users[i].EmailAddress);

        rc.appendChild(newPetCard);
    }
}

function zipCodeMonitor(event) {

    // debugger;

    try {

        // If this is a change event
        if (event.type === "change") {

            const zipcodeBox = document.getElementById("zipInput");

            if (zipcodeBox === null) {
                throw new Error("Zip code box is null");
            }

            const zipcode = zipcodeBox.value;

            if (zipcode === null || zipcode.length !== 5) {
                throw new Error("Zipcode is null or has incorrect length");
            }

            fetchCityFromZipcode(zipcode);

        }

    } catch (error) {
        console.error(error);
    }
}

// async function zipCodeBlur(event) {
    // console.log("blur happened")
    // if (event.type === "blur") {
        // await fetchCityFromZipcode()
    // }
// }

async function autofillZipcode() {

    try {

        // Start the fetch IP     
        console.log("starting geolocation...");

        const zip = await fetchGeolocation()
        .then(() => {
            const zip = addZipcodeToTextBox();
            if (zip === null) {
                throw new Error("Zipcode is null");
            }
            return zip;
        });

        if (zip === null) {
            throw new Error("Zipcode is null");
        }

        const city = await fetchCityFromZipcode(zip)
    }
    catch (error) {
        console.error(error);
    }
}

async function fetchCityFromZipcode(zipCode) {

    // Using regular expressions, check if zipcode is a 5-digit number
    const regex = /^[0-9]{5}$/;
    const isValidZip = regex.test(zipCode);
    if (!isValidZip) {
        setStatusMessage("Invalid zipcode");
        return;
    }

    try {

        // debugger;

        let response = await zipApiGetCityFromZip(zipCode)
        .then((response) => {

            // debugger;

            if (response && response.data && response.data.place_name) {
                let city = response.data.place_name;
                if (city.length > 0) {

                    // get 2 character zip code
                    let stateCode = getStateCodeByZipcode(zipCode);

                    // Display message
                    setStatusMessage(city + ', ' + stateCode);
                } else
                    setStatusMessage("Unknow zip code");
            } else {
                setStatusMessage("Can't get city from zip code");
            }
        })
    } catch (error) {
        setStatusMessage("Can't get city from zip code");
        console.error(error);
    }
}

function addZipcodeToTextBox() {

    // Get the zipcode from the geolocation
    const zipcode = getZipcode();

    // If zipcode is a valid US zipcode
    if (zipcode && getStateCodeByZipcode(zipcode)) {

        // Get the input box
        const div = document.getElementById("zipInput");

        // Check if div is valid and empty
        if (div && div.value === "") {
            try {

                // Set the value of the div to the zipcode
                div.value = zipcode;
                return zipcode;
            } catch (error) {
                console.error("Error populating zipcode box:", error);
            }
        }
    }
}

// function addCityToZipcodeBox(city) {
//     const zipcodeDiv = document.getElementById("zipInput");

//     // If there is a zip code and nothing else
//     if (zipcodeDiv.value.length === 5) {
//         // Add the city 
//         zipcodeDiv.value += ' - ' + city;
//     }
// }

// function removeCityFrmoZipCodeBox() {

//     debugger;

//     const zipcodeDiv = document.getElementById("zipInput");
//     if (zipcodeDiv && zipcodeDiv.value.length > 0) {

//         // If there is a - in the zip code, remove it and everything after
//         if (zipcodeDiv.value.includes(" -")) {
//             zipcodeDiv.value = zipcodeDiv.value.split(" -")[0];
//         }
//     }
// }
