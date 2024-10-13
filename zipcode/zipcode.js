import { zipApiCodesInRadius } from "./extapi-zipapi.js";
import { zipCodebaseCodesInRadius } from "./extapi-zipcodebase.js";

export { zipcodesInRadius }

async function zipcodesInRadius(zipcode, radius) {

    console.log(`zipcodesInRadius : zipcode:${zipcode}, radius: ${radius}`);

    // Validate inputs
    if (zipcode === null || radius === null) {
        throw new Error('Zipcode and radius should not be null');
    }

    // Use the free service for radius up to 148 miles, then use the paid service for radius up to 500 miles
    let f = (Number(radius) <= 148) ? zipApiCodesInRadius : zipCodebaseCodesInRadius;

    try {
        let result = await f(zipcode, radius);

    } catch (error) {
        console.error(error);
    }
}

console.log("Loaded zipcode.js");