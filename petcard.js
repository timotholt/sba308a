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
                        email="foo@example.com") {

    // If we have a backup
    if (backupOfCardDiv) {

        // Clone the div and all it's children
        let clonedDiv = backupOfCardDiv.cloneNode(true);


        debugger;

        // Populate it
        clonedDiv.querySelector(".animalName").innerHTML       = name;
        clonedDiv.querySelector(".pictureRow").innerHTML       = img;
        clonedDiv.querySelector(".cardLocationText").innerHTML = location;
        clonedDiv.querySelector(".cardBreedText").innerHTML    = breed;
        clonedDiv.querySelector(".cardDescText").innerHTML     = desc;
        clonedDiv.querySelector(".cardOwnerText").innerHTML    = owner;
        clonedDiv.querySelector(".cardPhoneText").innerHTML    = phone;
        clonedDiv.querySelector(".cardEmailText").innerHTML    = email;

        // And return it
        return (clonedDiv);
    }
    else {
        return null;
    }
}
