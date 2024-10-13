import { getPetName } from "./petnames.js";
import { injectUsMap } from "./usmap/usmap.js";
// import { zipCodebaseTest } from "./zipcodebase.js";
import { zipCodesInRadius } from "./zipapi.js";

const mapOfUsa = injectUsMap("mapOfUsa");

const petName = getPetName("abj248l");


// Zip Codebase Works
// await zipCodebaseTest()

// Free API
await zipCodesInRadius("90012", "5")
console.log(petName);
