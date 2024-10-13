import { getPetName } from "./petnames.js";
import { injectUsMap } from "./usmap/usmap.js";
import { zipcodesInRadius } from "./zipcode/zipcode.js";

const mapOfUsa = injectUsMap("mapOfUsa");

const petName = getPetName("abj248l");


// Zip Codebase Works
// await zipCodebaseTest()

// Free API
debugger;
console.log("calling zipcodesInRadius");
zipcodesInRadius("90012", "5");
//  zipcodesInRadius("90012", "500");
console.log(petName);



//===========================================================
// When the DOM is done loading, fill in the zipcode box
//===========================================================

import { autocompleteZipcode } from "./autocomplete.js";
document.addEventListener("DOMContentLoaded", function()
{
        autocompleteZipcode();
}, false);

