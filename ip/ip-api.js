export { fetchGeolocation, getZipcode }

let ip  = null;
let zip = null;

async function fetchGeolocation() {
    try {
        console.log('axios: Fetching IP through geolocation services from http://ip-api.com . . .');  

        const response = await axios.get('http://ip-api.com/json/');
        // console.log(response.data); 
        ip = response.data.query;
        zip = response.data.zip;

        console.log(`axios: Your IP address is ${ip} (${response.data.city}, ${response.data.regionName}, ${zip})`);

    } catch (error) {
        console.error(error);
    }
}

function getZipcode() {
    return zip;
}

console.log("Loaded ip-api.js");

