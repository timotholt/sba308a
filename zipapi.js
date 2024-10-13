// zip-api.eu is totally free zip code API with no keys or authentication and no limits

// Get a list of zipcodes in a radius of 5 km
//
// https://zip-api.eu/api/v1/radius/US-90012/5/km

export { zipCodesInRadius }

let getZipCodesInRadiusOptions = {
    method: 'GET',
    url: `https://zip-api.eu/api/v1/radius/US-90012/5/km`
};

let zipUrlRadius = `https://zip-api.eu/api/v1/radius/`;
let sCountry = 'US';                                        // We always use US for the country
let sUnits = 'mi'                                           // Miles = 'mi', Kilometers = 'km'

async function zipCodesInRadius(zipcode, radius) {

    if (zipcode === null) {
        throw new Error('Zipcode should not be null');
    }

    if (radius === null) {
        throw new Error('Radius should not be null');
    }

    let sZipcode = zipcode.toString();
    let sRadius = radius.toString();
    let fullUrl = zipUrlRadius + sCountry + '-' + sZipcode + '/' + sRadius + '/' + sUnits;

    // console.log(`https://zip-api.eu/api/v1/radius/US-90012/500/km`)

    try {

        debugger;
        console.log(fullUrl);
        const response = await axios.get(fullUrl);
        console.log(`Response: ${response.data}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

console.log("goodbye from zipapi.js");
