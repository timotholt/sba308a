export { petCardInit, makePetCard }

//=====================================================================
// The concept is we clone a card that's in the HTML, remove it from
// the DOM, and reuse it to make new pet cards.
//
// This way we can see what we make, and make changes to it visually,
// and not have to cut and paste a ton of HTML into petcard.js.
//=====================================================================

let backupOfCardDiv;;

// This is save to call over and over since we only do this once
function petCardInit(divId) {

    console.log("petCardInit: " + divId);

    // If we haven't made a backup yet
    if (!backupOfCardDiv) {

        // Get the element we want to clone
        let div = document.getElementById(divId);

        if (div == null)
            return null;

        // Clone the div and all it's children
        backupOfCardDiv = div.cloneNode(true);

        // Remove the id from the cloned div
        backupOfCardDiv.id = "";

        // Remove it from the DOM. Now it only exists in memory here.
        div.remove();

        // Hide it
        div.style.display = "none";
    }
}

// Make a new copy of the card and return it
function makePetCard(   name = "A Surprising Find",
                        img = "NO IMAGE",
                        location="Sunnyvale, CA",
                        breed="A Good One",
                        desc="A happy little one",
                        owner="It could be you",
                        phone="(555) 555-5555",
                        email="foo@example.com",
                        uuid="",
                        loved=false, favorite=false) {

    // If we have a backup
    if (backupOfCardDiv) {

        // Clone the div and all it's children
        let clonedDiv = backupOfCardDiv.cloneNode(true);

        // Populate it
        clonedDiv.querySelector(".animalName").innerHTML       = name;
        clonedDiv.querySelector(".pictureRow").innerHTML       = img;
        clonedDiv.querySelector(".cardLocationText").innerHTML = location;
        clonedDiv.querySelector(".cardBreedText").innerHTML    = breed;
        clonedDiv.querySelector(".cardDescText").innerHTML     = desc;
        clonedDiv.querySelector(".cardOwnerText").innerHTML    = owner;
        clonedDiv.querySelector(".cardPhoneText").innerHTML    = phone;
        clonedDiv.querySelector(".cardEmailText").innerHTML    = email;

        if (favorite) {
            clonedDiv.id = "favorite_" + uuid;
        } else {
            // Set the ID of the card to the GUID of the animal in the form: "animal_#####-#####-#####-####-####-####"
            clonedDiv.id = "animal_" + uuid;
        }

        // Handle a ID for the heart
        let heartDiv = clonedDiv.querySelector(".heart");
        heartDiv.id = "heart_" + uuid;

        // And if the card is loved...
        if (loved) {
            heartDiv.classList.add("love");
        }
        else {
            heartDiv.classList.remove("love");
        }

        // And return it
        return (clonedDiv);
    }
    else {
        return null;
    }
}
