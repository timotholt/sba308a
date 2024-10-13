import { getPetName } from "./petnames.js";
import { injectUsMap } from "./usmap/usmap.js";
import { zipcodesInRadius } from "./zipcode/zipcode.js";
import { getIp } from "./ip/getip.js";

const mapOfUsa = injectUsMap("mapOfUsa");

const petName = getPetName("abj248l");


// Zip Codebase Works
// await zipCodebaseTest()

getIp();

// Free API
debugger;
console.log("calling zipcodesInRadius");
zipcodesInRadius("90012", "5");
//  zipcodesInRadius("90012", "500");
console.log(petName);
