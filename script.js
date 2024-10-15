import { getPetName } from "./simulate/petnames.js";
import { injectUsMap } from "./usmap/usmap.js";
import { zipcodesInRadius } from "./zipcode/zipcode.js";

import { isJsonSiloInitDone, jsonSiloInit } from "./simulate/jsonsilo.js";
import { isUiInitDone, uiInit } from "./ui.js";
import { setStatusMessage } from "./statusmessage.js";

import { petCardInit, makePetCard } from "./petcard.js";

//===========================================================
// When the DOM is done loading, fill in the zipcode box
//===========================================================

function initSearchForm() {

    // Remove the disabled class from the form
    document.querySelector("#searchFormInputs").classList.remove("searchFormInputsDisabled");

    // Add the enabled class to the form
    document.querySelector("#searchFormInputs").classList.add("searchFormInputsEnabled");

    // setStatusMessage("Ready");
}

let fetchingUsers = false;

// initialize the application. This is called every second checking to make sure everything is done
async function initApp() {

    console.log("Initializing...");

    // Initialize the database engine
    if (!isJsonSiloInitDone()) {

        if (!fetchingUsers) {

            fetchingUsers = true;
            setStatusMessage("Fetching users...");
        }

        try {
            await jsonSiloInit();
        } catch (error) {
            console.error("Error initializing database engine: ", error);
            if (error instanceof Error) {
                console.error("Error name: ", error.name);
                console.error("Error message: ", error.message);
                console.error("Error stack: ", error.stack);
            }
        }
    }

    // Initialize the UI
    if (!isUiInitDone()) {
        try {
            setStatusMessage("Fetching geolocation zip code...");

            await uiInit();
        } catch (error) {
            console.error("Error initializing autocomplete: ", error);
            if (error instanceof Error) {
                console.error("Error name: ", error.name);
                console.error("Error message: ", error.message);
                console.error("Error stack: ", error.stack);
            }
        }
    }

    // If everything is done
    if (isJsonSiloInitDone()
    && isUiInitDone()
    ) {

        console.log("Everything is done, enabling form");

        // Enable the form
        initSearchForm();
    }

    else {

        console.log("Still waiting...");

        // Otherwise, wait a second and try again
        setTimeout(initApp, 1000);
    }
}






// Initialize the map
injectUsMap("mapOfUsa");

// Initialize the petCard library
petCardInit("petCardTemplate");
debugger;

{
// Add a card to the list
let div = document.querySelector(".resultContainer");
let card = makePetCard();
div.appendChild(card);

card = makePetCard();
div.appendChild(card);

card = makePetCard();
div.appendChild(card);

card = makePetCard();
div.appendChild(card);

card = makePetCard();
div.appendChild(card);


}

// const petName = getPetName("abj248l");

document.addEventListener("DOMContentLoaded", async function() {


    // Initialize the app
    setTimeout(initApp, 1000);

    }, false);


    
// Zip Codebase Works
// await zipCodebaseTest()
// Free API
// console.log("calling zipcodesInRadius");
// zipcodesInRadius("90012", "5");
// //  zipcodesInRadius("90012", "500");
// console.log(petName);
