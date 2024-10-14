export { autocompleteInit, isAutocompleteInitDone }
import { fetchGeolocation, getZipcode } from "./ip/getip.js";
import { getStateCodeByZipcode } from "./zipcode/zipcode-convert.js";
import { zipApiGetCityFromZip } from "./zipcode/extapi-zipapi.js";

let autocompleteFinished = false;

function isAutocompleteInitDone() {
    return (autocompleteFinished);
}

async function autocompleteInit() {

    if (!autocompleteFinished) {
        // Fill in the zip code box with GeoLocation
        await autofillZipcode();
        
        // Attach event listener to zip code box
        // document.getElementById("zipInput").addEventListener("focus", zipCodeMonitor);
        // document.getElementById("zipInput").addEventListener("blur", zipCodeBlur);

        autocompleteFinished = true;
    }
}

function zipCodeMonitor(event) {

    // debugger;

    // If this is a focus event, add the city if there is none
    // if (event.type === "focus") {
        // removeCityFrmoZipCodeBox();
    // }
    // else if (event.type === "blur") {
        // addCityToZipcodeBox();
    // }
}

// async function zipCodeBlur(event) {
    // console.log("blur happened")
    // if (event.type === "blur") {
        // await fetchCityFromZipcode()
    // }
// }

async function autofillZipcode() {

    debugger;


    try {

        debugger;

        // Start the fetch IP     
        console.log("starting geolocation...");

            await fetchGeolocation()
            .then(() => {
                const zip = addZipcodeToTextBox();
                if (zip === null) {
                    throw new Error("Zipcode is null");
                }
                return zip;
            })
            // .then(() => {
            //     let city = addCityToZipcodeBox()
            //     if (city === null) {
            //         throw new Error("City is null");
            //     }
            //     return city;
            // })
        }
    catch (error) {
        console.error(error);
    }
}

// async function fetchCityFromZipcode() {

//     try {
//         let zip;
//         let city;

//         // Start the fetch IP     
//             .then(() => {
//                 zip = addZipcodeToTextBox();
//                 if (zip === null) {
//                     throw new Error("Zipcode is null");
//                 }
//                 return zip;
//             })
//             .then(zip => {
//                 if (zip === null) {
//                     throw new Error("Zipcode is null");
//                 } else {
//                     return zipApiGetCityFromZip(zip);
//                 }
//             })
//             .then(result => {
//                 if (result === null) {
//                     throw new Error("City is null");
//                 }
//                 city = result;
//                 return result;
//             });

//         if (city === null) {
//             throw new Error("City is still null after calling addCityToZipcodeBox");
//         }

//         addCityToZipcodeBox(city);
//     } catch (error) {
//         console.error(error);
//     }
// }

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
