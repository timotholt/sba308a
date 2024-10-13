export { autocompleteZipcode }
import { fetchGeolocation, getZipcode } from "./ip/getip.js";
import { getStateCodeByZipcode } from "./zipcode/zipcode-convert.js";

async function autocompleteZipcode() {

    // Start the fetch IP     
    await fetchGeolocation()
        .then(populateZipCodeBox);
}
function populateZipCodeBox() {

    debugger;

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
            } catch (error) {
                console.error("Error populating zipcode box:", error);
            }
        }
    }
}
