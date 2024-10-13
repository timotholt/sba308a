export { getIp }

async function getIp() {
    try {
        console.log('Fetching IP...');  

        const response = await axios.get('http://ip-api.com/json/');
        // console.log(response.data); 

        console.log(`(ASYNC) Your IP address is ${response.data.query} (${response.data.city}, ${response.data.regionName}, ${response.data.zip})`);

        debugger;
    } catch (error) {
        console.error(error);
        debugger
    }
}

console.log("Loaded getip.js");

