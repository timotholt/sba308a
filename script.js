import { getPetName } from "./petnames.js";
import { injectUsMap } from "./usmap/usmap.js";
// import { zipCodebaseTest } from "./zipcodebase.js";
import { zipApiCodesInRadius } from "./zipapi.js";
import { zipCodebaseCodesInRadius } from "./zipcodebase.js";

const mapOfUsa = injectUsMap("mapOfUsa");

const petName = getPetName("abj248l");


// Zip Codebase Works
// await zipCodebaseTest()

// Free API
await zipApiCodesInRadius("90012", "5")
await zipCodebaseCodesInRadius("90012", "500")
console.log(petName);
