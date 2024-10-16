// 488d9dd7-d9d4-4de3-89ff-6f62f1d25417
// 488d9dd7-d9d4-4de3-89ff-6f62f1d25417

// https://getpantry.cloud/apiv1/pantry/488d9dd7-d9d4-4de3-89ff-6f62f1d25417/basket/sba308a

// set favorites using axios
export async function saveFavorites(array) {

    if (!array) {
        throw new Error('saveFavorites: array is null or undefined');
    }

    // Send the array to the server
    try {

        console.log("axios: Sending favorites to https://getpantry.cloud . . .");
        const response = await axios.post('https://getpantry.cloud/apiv1/pantry/488d9dd7-d9d4-4de3-89ff-6f62f1d25417/basket/sba308a', { favorites: array } );
        const data = await response.data;
        if (!data) {
            throw new Error('saveFavorites: response data is null or undefined');
        }

        console.log("axios: Favorites saved to https://getpantry.cloud");
        // console.log(data);
        return data;

    } catch (error) {

        console.error(error);
        throw error;
    }
}

// get favorites using axios
export async function loadFavorites() {

    try {
        console.log("axios: Loading favorites from https://getpantry.cloud . . .");

        const response = await axios.get('https://getpantry.cloud/apiv1/pantry/488d9dd7-d9d4-4de3-89ff-6f62f1d25417/basket/sba308a');
        const data = await response.data;
        if (!data) {
            throw new Error('loadFavorites: response data is null or undefined');
        }
        console.log("axios: Favorites loaded from https://getpantry.cloud.");
        // console.log(data);
        return data.favorites;    
    } catch (error) {

        console.error(error);           
        throw error;
    }   
}

