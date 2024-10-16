//
// JSONSilo is a JSON hosting service upload JSON data to and retrieve it via the very
// barebones endpoints. It's useful for testing and demo purposes.
//
// I uploaded the sample data (stored in sampleuserdata.json) I created to jsonsilo.com.
// It's accessible through this end point:
//
// https://api.jsonsilo.com/public/b07d2a0d-022e-41e3-a3f6-2b4249e88f0a/
//
// No queries or anything is supported. It returns the JSON data I uploaded.
//
// Server Region: DE-01 (EU) [Dusseldorf]
// File uuid: b07d2a0d-022e-41e3-a3f6-2b4249e88f0a
//
// Silo URL: https://api.jsonsilo.com/public/b07d2a0d-022e-41e3-a3f6-2b4249e88f0a
//

const jsonSiloBaseUrl = `https://api.jsonsilo.com/public/b07d2a0d-022e-41e3-a3f6-2b4249e88f0a`;

export { jsonSiloInit, isJsonSiloInitDone, jsonSiloGetNumUsers, jsonSiloGetUserByIndex, jsonSiloGetUserByUuid, jsonSiloUserListByZip,
    jsonSiloGetUsersByState
}

let dbResponse;
let jsonSiloUserList;

function isJsonSiloInitDone()
{
    // console.log("jsonSiloInitDone: = " + (jsonSiloUserList?.length > 0));
    return jsonSiloUserList?.length > 0;
}

const consoleLogJsonSilo = false;

function cl(s) { if (consoleLogJsonSilo) console.log(s) }

// Init the database (fetch all users and save it)
async function jsonSiloInit() {

    cl("Initializing jsonSilo...");

    /* If we already fetched the data, don't fetch it again */
    if (jsonSiloUserList?.length > 0)
    {
        cl(`JsonSiloInit called but already have ${jsonSiloUserList.length} users`);
        return jsonSiloUserList;
    }

    // If we haven't started fetching it, fetch it
    else if (dbResponse === undefined) {

        cl(`Fetching ${jsonSiloBaseUrl}...`);

        // Fetch it
        dbResponse = await axios.get(jsonSiloBaseUrl);

        cl(`axios.get returned ${dbResponse.status} ${dbResponse.statusText}`);
    }

    // Check if we got our data yet...
    else if (dbResponse.data) {

        // If we got it, save it
        cl(`Got ${dbResponse.data.length} users from ${jsonSiloBaseUrl}`);

        // Deep copy dbResponse.data into jsonSiloUserList
        jsonSiloUserList = JSON.parse(JSON.stringify(dbResponse.data));
    }

    // Otherwise we got an error
    else if (dbResponse.status < 200 || dbResponse.status > 300) {
        cl(`Error in jsonSiloInit: ${dbResponse.status} ${dbResponse.statusText}`);
    }

    // Otherwise IDK what's happening
    else {
        cl(`Unknown error in jsonSiloInit: ${dbResponse.status} ${dbResponse.statusText}`);
    }
}

async function jsonSiloGetNumUsers() {
    return jsonSiloUserList.length;
}

async function jsonSiloGetUserByIndex(n) {

    if (n === null || n === undefined) {
        throw new Error("n is null or undefined");
    }

    if (jsonSiloUserList === null || jsonSiloUserList === undefined) {
        throw new Error("jsonSiloUserList is null or undefined after calling jsonSiloGetAllUsers()");
    }

    if (n < 0 || n >= jsonSiloUserList.length) {
        throw new Error(`n is out of range: ${n}`);
    }

    return jsonSiloUserList[n];
}

function jsonSiloGetUserByUuid(uuid) {

    if (uuid === null || uuid === undefined) {
        throw new Error("uuid is null or undefined");
    }

    if (jsonSiloUserList === null || jsonSiloUserList === undefined) {
        throw new Error("jsonSiloUserList is null or undefined after calling jsonSiloGetAllUsers()");
    }

    if (jsonSiloUserList.length === 0) {
        throw new Error("jsonSiloUserList is empty");
    }

    const foundUser = jsonSiloUserList.find(user => {
        if (user === null || user === undefined) {
            throw new Error("user is null or undefined");
        }
        return user.GUID === uuid;
    });

    if (foundUser === undefined) {
        throw new Error(`User with uuid=${uuid} not found in jsonSiloUserList`);
    }

    return foundUser;
}

function jsonSiloUserListByZip(zipCodeList) {

    let result;

    // From the zip code list, find the users in the jsonSiloUserList
    // that are in the zip code list

    if (jsonSiloUserList === null || jsonSiloUserList === undefined) {
        throw new Error("jsonSiloUserList is null or undefined after calling jsonSiloGetAllUsers()");
    }

    if (jsonSiloUserList.length === 0) {
        throw new Error("jsonSiloUserList is empty");
    }

    const foundUsers = jsonSiloUserList.filter(user => {
        if (user === null || user === undefined) {
            throw new Error("user is null or undefined");
        }
        return zipCodeList.includes(user.zip);
    });

    return foundUsers;
}

// From the list of users, find the users in the state with a maximum as a parameter
function jsonSiloGetUsersByState(stateAbbrev, maxUsers) {

    let foundUsers = [];
    let numFoundUsers = 0;
    stateAbbrev = stateAbbrev.toUpperCase();

    if (stateAbbrev === null || stateAbbrev === undefined) {
        throw new Error("stateAbbrev is null or undefined");
    }

    if (jsonSiloUserList === null || jsonSiloUserList === undefined) {
        throw new Error("jsonSiloUserList is null or undefined after calling jsonSiloGetAllUsers()");
    }

    if (jsonSiloUserList.length === 0) {
        throw new Error("jsonSiloUserList is empty");
    }

    // const foundUsers = jsonSiloUserList.filter(user => {
    //     if (user === null || user === undefined) {
    //         throw new Error("user is null or undefined");
    //     }
    //     return user.state === stateAbbrev;  // user.state is a string
    // });

    for (let i = 0; i < jsonSiloUserList.length; i++) {
        if (jsonSiloUserList[i].State === stateAbbrev) {
            foundUsers.push(jsonSiloUserList[i]);
        }
    }

    numFoundUsers = foundUsers.length;

    // Trim the list to maxUsers
    if (foundUsers.length > maxUsers)
        foundUsers = foundUsers.slice(0, maxUsers);

    // Return an object with the users, the # users found and the max users passed
    return {
        users: foundUsers,
        count: foundUsers.length,
        maxCount: numFoundUsers
    }
}
