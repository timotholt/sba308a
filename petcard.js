export { petCardInit, makePetCard }

//=====================================================================
// The concept is we clone a card that's in the HTML, remove it from
// the DOM, and reuse it to make new pet cards.
//
// This way we can see what we make, and make changes to it visually,
// and not have to cut and paste a ton of HTML into petcard.js.
//=====================================================================

let backupOfCardDiv;;

// Here we backup the div used as a pet card
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
function makePetCard() {

    // If we have a backup
    if (backupOfCardDiv) {

        // Clone the div and all it's children
        clonedDiv = document.querySelector(div).cloneNode(true);

        // And return it
        return (clonedDiv);
    }
    else {
        return null;
    }
}

