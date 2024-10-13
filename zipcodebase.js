// https://app.zipcodebase.com/email/verify
const zipCodeBaseApiKey = "d6970140-8981-11ef-a30e-81649cbcd7aa";

// Can't get imports to work so I gave up
// import { axios } from '../axios/axios.min.js';
// import { axios } from 'https://unpkg.com/axios/dist/axios.min.js';
// import { axios } from './axios.min.js';

const options = {
    method: 'GET',
    url: `https://app.zipcodebase.com/api/v1/search?apikey=${zipCodeBaseApiKey}&codes=10005,10006`,
};

async function zipCodeTest() {
    
    try {   
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

console.log("goodbye from zipcodebase.js");
