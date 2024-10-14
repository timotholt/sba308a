export { fetchGeolocation, getZipcode }

let ip  = null;
let zip = null;

async function fetchGeolocation() {
    try {
        console.log('Fetching IP...');  

        const response = await axios.get('http://ip-api.com/json/');
        // console.log(response.data); 
        ip = response.data.query;
        zip = response.data.zip;

        console.log(`(ASYNC) Your IP address is ${ip} (${response.data.city}, ${response.data.regionName}, ${zip})`);

    } catch (error) {
        console.error(error);
    }
}

function getZipcode() {
    return zip;
}

console.log("Loaded getip.js");

