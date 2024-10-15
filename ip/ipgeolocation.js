// https://ipgeolocation.io/

// https://api.ipgeolocation.io/ipgeo

export { fetchGeolocation, getZipcode }

let ip  = null;
let zip = null;

async function fetchGeolocation() {
    try {
        console.log('Fetching IP...');  

        const response = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=9726d1d7eee14626b240b158cedd819d');
        // console.log(response.data); 
        ip = response.data.ip;
        zip = response.data.zipcode;

        // Change zipcode to 5 digits
        zip = zip.padStart(5, '0');

        console.log(`(ASYNC) Your IP address is ${ip} (${response.data.city}, ${response.data.state_prov}, ${zip})`);

    } catch (error) {
        console.error(error);
    }
}

function getZipcode() {
    return zip;
}

console.log("Loaded ip-api.js");
