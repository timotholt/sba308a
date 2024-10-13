// zip-api.eu is totally free zip code API with no keys or authentication and no limits

// Get a list of zipcodes in a radius of 5 km
//
// https://zip-api.eu/api/v1/radius/US-90012/5/km

export { zipCodesInRadius }

let options = {
    method: 'GET',
    url: `https://zip-api.eu/api/v1/radius/US-90012/5/km`
};

let zipUrlRadius = `https://zip-api.eu/api/v1/radius/`;
let sCountry = 'US';                                        // We always use US for the country
let sUnits = 'm'                                            // Miles = 'm', Kilometers = 'km'

async function zipCodesInRadius(zipcode, radius) {

    let sZipcode = zipcode.toString();
    let fullUrl = zipUrlRadius + sCountry + '-' + sZipcode + '/' + radius + '/' + sUnits;
    debugger;
    // console.log(fullUrl);
    // console.log(`https://zip-api.eu/api/v1/radius/US-90012/500/km`)

    try {   
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

console.log("goodbye from zipapi.js");
