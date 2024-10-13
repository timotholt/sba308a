export { zipCodebaseTest, zipCodebaseCodesInRadius}

// https://app.zipcodebase.com/email/verify
const zipCodebaseApiKey = "d6970140-8981-11ef-a30e-81649cbcd7aa";

// Can't get imports to work so I gave up
// import { axios } from '../axios/axios.min.js';
// import { axios } from 'https://unpkg.com/axios/dist/axios.min.js';
// import { axios } from './axios.min.js';

const options = {
    method: 'GET',
    url: `https://app.zipcodebase.com/api/v1/search?apikey=${zipCodebaseApiKey}&codes=10005,10006`,
};

async function zipCodebaseTest() {
    
    try {   
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}


// https://app.zipcodebase.com/api/v1/radius?apikey=d6970140-8981-11ef-a30e-81649cbcd7aa&code=10005&radius=100&country=us


// Don't change these values// Don't change these values
const sCountry = 'us';                                          // We always use 'us' for the country
const sUnits = 'miles'                                          // Miles = 'miles', Kilometers = 'km'
const zipCodebaseRadiusUrl = `https://app.zipcodebase.com/api/v1/radius/`;

async function zipCodebaseCodesInRadius(zipcode, radius) {

    if (zipcode === null) {
        throw new Error('Zipcode should not be null');
    }

    if (radius === null) {
        throw new Error('Radius should not be null');
    }

    let sZipcode = zipcode.toString();
    let sRadius = radius.toString();
    let fullUrl = zipCodebaseRadiusUrl + '?apikey=' + zipCodebaseApiKey + '&code=' + sZipcode + '&radius=' + sRadius + '&country=' + sCountry + '&unit=' + sUnits;

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




console.log("goodbye from zipcodebase.js");
