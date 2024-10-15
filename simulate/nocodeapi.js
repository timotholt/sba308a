//=============================================================================
//
// Nocode API is a website where you can create your own APIs easily with no code.
//
// I created two APIs for this project, that provides two endpoint into two
// different google sheets that I created!
//
// This endpoint is a list of 5000 users. Each user has a name, email, phone, zip code:
//  randomUsersUrl   = 'https://v1.nocodeapi.com/timotholt/google_sheets/adbrItJLlfmSRbvl';
//
// This endpoint is for saving favorite searches:
//  saveFavoritesUrl = 'https://v1.nocodeapi.com/timotholt/google_sheets/VImuIhbfQVWMnpsS';
//
// Out of the box, my fake API supports the following:
//
// (GET) Get rows
// (POST) Add new Rows
// (PUT) Update row
// (DELETE) Delete row
// (POST) Add new Rows as JSON objects
// (POST) Create a new Spreadsheet
// (PUT) Style Cells
// (POST) Create new tab
// (GET) Search

const randomUsersUrl   = 'https://v1.nocodeapi.com/timotholt/google_sheets/adbrItJLlfmSRbvl';
const saveFavoritesUrl = 'https://v1.nocodeapi.com/timotholt/google_sheets/VImuIhbfQVWMnpsS';

async function getAllUsers() {

    try {
        const response = await axios.get(randomUsersUrl);
        return response.data;

    } catch (error) {

        console.error(error);

    }
}
