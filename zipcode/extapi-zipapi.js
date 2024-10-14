// zip-api.eu is totally free zip code API with no keys or authentication and no limits
//
// Documentation is at: https://zip-api.eu/en/
//
// Get a list of zipcodes in a radius of 5 km from 90012 in the USA
// https://zip-api.eu/api/v1/radius/US-90012/5/km

export { zipApiCodesInRadius, zipApiGetCityFromZip }

// Don't change these values
const sCountry = 'US';                                        // We always use US for the country
const sUnits = 'mi'                                           // Miles = 'mi', Kilometers = 'km'
const zipApiRadiusUrl      = `https://zip-api.eu/api/v1/radius/`;
const zipApiCityFromZipUrl = `https://zip-api.eu/api/v1/info/`;

async function zipApiCodesInRadius(zipcode, radius) {

    if (zipcode === null) {
        throw new Error('Zipcode should not be null');
    }

    if (radius === null) {
        throw new Error('Radius should not be null');
    }

    let sZipcode = zipcode.toString();
    let sRadius = radius.toString();
    let fullUrl = zipApiRadiusUrl + sCountry + '-' + sZipcode + '/' + sRadius + '/' + sUnits;

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

async function zipApiGetCityFromZip(zipcode) {

    if (zipcode === null) {
        throw new Error('Zipcode should not be null');
    }

    try {
        let sZipcode = zipcode.toString();
        let fullUrl = zipApiCityFromZipUrl + sCountry + '-' + sZipcode + '/';
        debugger;       
        console.log(fullUrl);
        const response = await axios.get(fullUrl);
        console.log(`Response: ${response.data.place_name}`);
        return (response.data.place_name);

    } catch (error) {
        console.error(error);
    }
}

console.log("Loaded extapi-zipapi.js");
