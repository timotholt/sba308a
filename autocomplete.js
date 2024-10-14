export { autocompleteInit, isAutocompleteInitDone }
import { fetchGeolocation, getZipcode } from "./ip/getip.js";
import { getStateCodeByZipcode } from "./zipcode/zipcode-convert.js";
import { zipApiGetCityFromZip } from "./zipcode/extapi-zipapi.js";
import { setStatusMessage } from "./statusmessage.js";

let autocompleteFinished = false;


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

function isAutocompleteInitDone() {
    return (autocompleteFinished);
}

async function autocompleteInit() {

    if (!autocompleteFinished) {

        // Fill in the zip code box with GeoLocation
        await autofillZipcode();        
        autocompleteFinished = true;

        // Attach event listener to zip code box
        document.getElementById("zipInput").addEventListener("change", zipCodeMonitor, false);

        // Start status code monitor
        // setTimeout(statusCodeMonitor, 1000);
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

        debugger;

        let response = await zipApiGetCityFromZip(zipCode)
        .then((response) => {

            debugger;

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
