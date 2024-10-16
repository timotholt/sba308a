export { uiInit, isUiInitDone }

let autoSaveTime = 10000;

// resultButton
// favoritesButton

// function setButtonTitle(buttonId, s) {

//     let button = document.getElementById(buttonId);
//     if (button !== null) {
//         button.title = s;
//     }
// }

//=============================================================================
// Two different Geolocation APIs
//
// ip-api.js is the best, but doesn't allow secure connections for free
// ipgeolocation.js is the worst, but allows regular connections
//
// Ramifications: You can't use ip-api from github pages
//                ipgeolocation.io isn't as accurate as ip-api
//=============================================================================

import { fetchGeolocation,  getZipcode  } from "./ip/ip-api.js";              // Best but doesn't allow secure connections
import { fetchGeolocation2, getZipcode2 } from "./ip/ipgeolocation.js";       // Worst but allows regular connections
let geoLocationService = 1;

import { getStateCodeByZipcode } from "./zipcode/zipcode-convert.js";
import { zipApiGetCityFromZip } from "./zipcode/extapi-zipapi.js";
import { setStatusMessage } from "./statusmessage.js";

import { petCardInit, makePetCard } from "./petcard.js";
import { getStateName } from "./usmap/usmap.js";

import { jsonSiloGetUsersByState, jsonSiloGetUserByUuid } from "./simulate/jsonsilo.js";

import { saveFavorites, loadFavorites } from "./favoritesio.js";

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

        // Attach event listener to US map
        document.getElementById("mapOfUsa").addEventListener("click", usMapMonitor, false);

        // Load favorites
        loadFavoritePets();

        // Set "auto-save favorites" handler every 5 seconds
        setTimeout(autosaveFavorites, autoSaveTime);
        // setTimeout(autosaveFavorites, 60000);

        // Start status code monitor
        // setTimeout(statusCodeMonitor, 1000);
    }
}

let numCardsResultTab = 0;
let numCardsFavoriteTab = 0;
const TAB_FAVORITES = Symbol("favorites");
const TAB_RESULT    = Symbol("result");

function resetTab(tab) {

    // Get both divs
    let resultDiv    = document.getElementById("resultContainer");
    let favoritesDiv = document.getElementById("favoritesContainer");

    // Get the div we are adding this card to
    let targetDiv = (tab === TAB_RESULT) ? resultDiv : favoritesDiv;

    // Reset the div
    targetDiv.innerHTML = "";
    (tab === TAB_RESULT) ? numCardsResultTab = 0 : numCardsFavoriteTab = 0; 
}

function addPetToTab(tab, petName, petImage, location, breed, description, ownerName, ownerPhone, ownerEmail, guid, isLoved) {

    // Calculate card names for both 
    let animalId = "#animal_" + guid;
    let favoriteId = "#favorite_" + guid;
    let favoritesTab = (tab === TAB_FAVORITES);

    // Get both divs
    let resultDiv    = document.getElementById("resultContainer");
    let favoritesDiv = document.getElementById("favoritesContainer");

    // Get the div we are adding this card to
    let targetDiv = (tab === TAB_RESULT) ? resultDiv : favoritesDiv;
    let targetId  = (tab === TAB_RESULT) ? animalId : favoriteId;

    // Make sure the card doesn't exist already
    if (targetDiv.querySelector(targetId) !== null) {
        return;
    }

    // Calculate the complex card text
    let aTag   = `<a href="mailto:${ownerEmail}"/>${ownerEmail}</a>`;
    let imgTag = `<img class="petPic" src=${petImage} loading="lazy">`;

    // Make the card
    let newCard = makePetCard(petName, imgTag, location, breed, description, ownerName, ownerPhone, aTag, guid, isLoved, favoritesTab);

    // Add event listener to the card
    newCard.addEventListener("click", toggleFavoriteHandler, false);

    // Add the card to the target div
    targetDiv.appendChild(newCard);

    // Increase the count
    (tab === TAB_RESULT) ? numCardsResultTab++ : numCardsFavoriteTab++;

    // Change the message
    setTabButtonMessage(tab, (tab === TAB_RESULT) ? `Results (${numCardsResultTab})` : `Favorites (${numCardsFavoriteTab})`);
}

function removePetFromTab(tab, guid) {
    
    // Calculate card names for both 
    let animalId = "#animal_" + guid;
    let favoriteId = "#favorite_" + guid;

    // Get both divs
    let resultDiv    = document.getElementById("resultContainer");
    let favoritesDiv = document.getElementById("favoritesContainer");

    // Get the div we are adding this card to
    let targetDiv = (tab === TAB_RESULT) ? resultDiv : favoritesDiv;
    let targetId  = (tab === TAB_RESULT) ? animalId : favoriteId;

    // If the card exists
    let targetCard = targetDiv.querySelector(targetId);
    if (targetCard !== null) {

        // Remove it from the div
        targetDiv.removeChild(targetCard);

        // Decrease the count
        (tab === TAB_RESULT) ? numCardsResultTab-- : numCardsFavoriteTab--;

        // Change the message
        setTabButtonMessage(tab, (tab === TAB_RESULT) ? `Results (${numCardsResultTab})` : `Favorites (${numCardsFavoriteTab})`);
        return;
    }
}

function setTabButtonMessage(tab, message) {

    // Get the div we are setting the message to
    let targetDiv = (tab === TAB_RESULT) ?
        document.getElementById("resultButton") :
        document.getElementById("favoritesButton");

    // Set the message
    targetDiv.innerHTML = message;
}


let lastFavoritesList = [];

async function autosaveFavorites() {

    // This JSON object holds all the favorites
    let favoritesList = [];
    let individualFavorite = {};

    // For each card in the favorite list
    let favoritesContainer = document.getElementById("favoritesContainer");
    if (favoritesContainer !== null && favoritesContainer.children !== null) {
    
        // For each node
        let cards = favoritesContainer.children;
        for (let i = 0; i < cards.length; i++) {

            // If it's a card
            if (cards[i].id !== null && cards[i].id.startsWith("favorite_")) {

                // Get the GUID
                let id = cards[i].id.split("_")[1];

                // Add it to the favoritesList object
                individualFavorite = {
                    GUID: id
                };

                // console.log(individualFavorite);

                // Add to list
                favoritesList.push(individualFavorite);    
            }
        }

        // If we have any favorites
        if (favoritesList?.length > 0) {

        // Do a deep match of the favorites list to the last vavorites list
        if (JSON.stringify(favoritesList) === JSON.stringify(lastFavoritesList)) {
            console.log("Autosave: No change to the favorites list, nothing to save.");
        }

        // Try to save favorites
        else try {

                // Save favorites to server
                await saveFavorites(favoritesList);

                console.log("Saved favorites!");

                // Do a deep copy of the favorites list to the lastfavorites list
                lastFavoritesList = JSON.parse(JSON.stringify(favoritesList));

            } catch (error) {
                console.error("Error autosaving favorites:", error);
            }

        }
    }

    // and call our handler again
    setTimeout(autosaveFavorites, autoSaveTime); 
}

async function toggleFavoriteHandler(event) {

    debugger;

    // If we clicked a heart ...
    if (event.target.id.startsWith("heart_")) {

        // Get the id of the animal
        let id = event.target.id.split("_")[1];
        let loved;

        // Toggle the heart
        event.target.classList.toggle("love");

        // Get the heart state
        loved = event.target.classList.contains("love");

        // If we are loved
        if (loved) {

            // Find it in the database
            let target = jsonSiloGetUserByUuid(id);

            if (target === null) {
                throw new Error("BAD BAD BAD: targetUuid is null");
            }
            else {

                // Add it
                addPetToTab(TAB_FAVORITES, 
                        target.petName,
                        target.petImage,
                        target.City + ", " + target.State,
                        target.petBreed,
                        target.petDescription,
                        target.GivenName + " " + target.Surname,
                        target.TelephoneNumber,
                        target.EmailAddress,
                        target.GUID,
                        true);
            }
        }

        // We are unloving a pet
        else {
            removePetFromTab(TAB_FAVORITES, id);

            // Find pet in the result tab
            let resultDiv = document.getElementById("resultContainer");
            let targetDiv = resultDiv.querySelector("#animal_" + id);
            if (targetDiv !== null) {
                // Find the heart div
                let heartDiv = targetDiv.querySelector(".heart");
                if (heartDiv !== null) {
                    heartDiv.classList.remove("love");
                }
            }
            // Remove heart from animal on the result tab
        }
    }
    else {
        console.log("not a heart event");
    }
}

async function loadFavoritePets() {

    try {

        // Get the favorites from the server
        let favoritesList = await loadFavorites();

        // Get the favorite container
        let favoritesContainer = document.getElementById("favoritesContainer");
        if (favoritesContainer !== null) {

            // Remove all existing child divs
            favoritesContainer.innerHTML = '';

            // For each favorite
            for (let i = 0; i < favoritesList.length; i++) {

                // Find the card in the database
                let target = jsonSiloGetUserByUuid(favoritesList[i].GUID);

                if (target === null) {
                    throw new Error("BAD BAD BAD: targetUuid is null");
                }
                else  {

                    // Add it
                    addPetToTab(TAB_FAVORITES, 
                        target.petName,
                        target.petImage,
                        target.City + ", " + target.State,
                        target.petBreed,
                        target.petDescription,
                        target.GivenName + " " + target.Surname,
                        target.TelephoneNumber,
                        target.EmailAddress,
                        target.GUID,
                        true);
                }
            }
        }

        // Do a deep copy of the favorites list to the lastfavorites list
        lastFavoritesList = JSON.parse(JSON.stringify(favoritesList));

    } catch (error) {
        console.error("Error loading favorites:", error);
    }
}

async function usMapMonitor(event) {

    let stateName;
    let stateAbbrev;

    debugger;

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

    // Remove all previous animals in the result area
    resetTab(TAB_RESULT);

    // Find the DIVs to output results
    let rm = document.getElementById("resultMessage");
    let rc = document.getElementById("resultContainer");

    // Fetch users in the state
    let searchResult = jsonSiloGetUsersByState(stateAbbrev, 50);
    
    // If we found no users...
    if (searchResult.length === 0) {

        // Let the user know
        rm.innerHTML = "No animals in our database found for the state of " + getStateName(event.target.id);
        return;
    }

    // Let the user know how many we found
    rm.innerHTML = `Returning ${searchResult.count} of ${searchResult.maxCount} animals in ${stateName}. \n<small></small>`;

    // Then add each pet to the result area
    for (let i = 0; i < searchResult.count; i++) {

        let loved = false;

        // Calculate the favorite version of the name
        let favName = `favorite_${searchResult.users[i].GUID}`;

        // Get favorite container
        let favoritesContainer = document.getElementById("favoritesContainer");

        // If there is a child element inside the favoritesContainer that matches the name
        if (favoritesContainer != null) {
            let child = favoritesContainer.querySelector(`#${favName}`);
            if (child !== null) {
                loved = true;
            }
        }

        addPetToTab(TAB_RESULT, 
            searchResult.users[i].petName,
            searchResult.users[i].petImage,
            searchResult.users[i].City + ", " + searchResult.users[i].State,
            searchResult.users[i].petBreed,
            searchResult.users[i].petDescription,
            searchResult.users[i].GivenName + " " + searchResult.users[i].Surname,
            searchResult.users[i].TelephoneNumber,
            searchResult.users[i].EmailAddress,
            searchResult.users[i].GUID,
            loved);
    }
}

function zipCodeMonitor(event) {

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

    let zip;

    try {

        // Start the fetch IP     
        console.log("Starting geolocation service #1...");

        zip = await fetchGeolocation()
        .then(() => {
            let zip = addZipcodeToTextBox();
            if (zip === null) {
                throw new Error("Zipcode is null");
            }
            return zip;
        });

        if (zip === null) {
            throw new Error("Zipcode is null");
        }

        const city = await fetchCityFromZipcode(zip);
    }
    catch (error) {
        console.error(error);

        // Try the other geolocation service
        try {
            geoLocationService = 2;

            // Start the fetch IP     
            console.log("Starting geolocation service #2...");

            const zip = await fetchGeolocation2()
            .then(() => {
                const zip = addZipcodeToTextBox();
                if (zip === null) {
                    throw new Error("Zipcode is null");
                }
                return zip;
            });

            if (zip === null) {
                geoLocationService = 0;
                throw new Error("Zipcode is null");
            }

            const city = await fetchCityFromZipcode(zip);
            geoLocationService = 0;
        }
        catch (error) {
            geoLocationService = 0;
            console.error(error);
        }    
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

        let response = await zipApiGetCityFromZip(zipCode)
        .then((response) => {

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

    let zipcode;

    // Get the zipcode from the geolocation
    switch (geoLocationService) {
        case 1: zipcode = getZipcode(); break;
        case 2: zipcode = getZipcode2(); break;
        default: return;
    }

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

//     const zipcodeDiv = document.getElementById("zipInput");
//     if (zipcodeDiv && zipcodeDiv.value.length > 0) {

//         // If there is a - in the zip code, remove it and everything after
//         if (zipcodeDiv.value.includes(" -")) {
//             zipcodeDiv.value = zipcodeDiv.value.split(" -")[0];
//         }
//     }
// }

console.log("Loaded ui.js");
