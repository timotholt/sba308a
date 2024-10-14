//
// JSONSilo is a fake database you can upload JSON data to and retrieve it via the very
// barebones api. It's useful for testing and demo purposes.
//
// I uploaded the fakeusers.json file to jsonsilo.com.  It's accessible through this
// end point:
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

export { jsonSiloGetAllUsers, jsonSiloGetNumUsers, jsonSiloGetUserByIndex, jsonSiloGetUserByUuid, jsonSiloUserListByZip }

const jsonSiloUserList = null;

async function jsonSiloGetAllUsers() {

    /* If we already fetched the data, don't fetch it again */
    if (jsonSiloUserList?.length > 0)
        return jsonSiloUserList;

    // Fetch it and save it
    try {
        // Fetch it
        const response = await axios.get(jsonSiloBaseUrl);

        // Save it
        jsonSiloUserList.push(...response.data);

        // Return it
        return jsonSiloUserList;
    } catch (error) {
        console.error(error);
    }
}

async function jsonSiloGetNumUsers() {
    if (!jsonSiloUserList) {
        await jsonSiloGetAllUsers();
        if (!jsonSiloUserList) {
            throw new Error("jsonSiloUserList is null after calling jsonSiloGetAllUsers()");
        }
    }
    return jsonSiloUserList.length;
}

async function jsonSiloGetUserByIndex(n) {

    if (n === null || n === undefined) {
        throw new Error("n is null or undefined");
    }

    if (jsonSiloUserList === null || jsonSiloUserList === undefined) {
        await jsonSiloGetAllUsers();
        if (jsonSiloUserList === null || jsonSiloUserList === undefined) {
            throw new Error("jsonSiloUserList is null or undefined after calling jsonSiloGetAllUsers()");
        }
    }

    if (n < 0 || n >= jsonSiloUserList.length) {
        throw new Error(`n is out of range: ${n}`);
    }

    return jsonSiloUserList[n];
}

async function jsonSiloGetUserByUuid(uuid) {

    if (uuid === null || uuid === undefined) {
        throw new Error("uuid is null or undefined");
    }

    if (jsonSiloUserList === null || jsonSiloUserList === undefined) {
        await jsonSiloGetAllUsers();
        if (jsonSiloUserList === null || jsonSiloUserList === undefined) {
            throw new Error("jsonSiloUserList is null or undefined after calling jsonSiloGetAllUsers()");
        }
    }

    if (jsonSiloUserList.length === 0) {
        throw new Error("jsonSiloUserList is empty");
    }

    const foundUser = jsonSiloUserList.find(user => {
        if (user === null || user === undefined) {
            throw new Error("user is null or undefined");
        }
        return user.uuid === uuid;
    });

    if (foundUser === undefined) {
        throw new Error(`User with uuid=${uuid} not found in jsonSiloUserList`);
    }

    return foundUser;
}

async function jsonSiloUserListByZip(zipCodeList) {

    let result;

    // From the zip code list, find the users in the jsonSiloUserList
    // that are in the zip code list

    if (jsonSiloUserList === null || jsonSiloUserList === undefined) {
        await jsonSiloGetAllUsers();
        if (jsonSiloUserList === null || jsonSiloUserList === undefined) {
            throw new Error("jsonSiloUserList is null or undefined after calling jsonSiloGetAllUsers()");
        }
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

