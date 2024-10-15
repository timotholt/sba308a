// From a pet ID, generate a pet name
export  { getPetName, getPetDescription  }

const petNames = [
    "Whiskers", "Snuggles", "Patches", "Pepper", "Cookie", "Milo", "Luna", "Oliver", "Willow", "Hazel", 
    "Pixel", "Zephyr", "Phoenix", "Nova", "Jasper", "Onyx", "Sage", "Raven", "Storm", "Echo", 
    "River", "Aspen", "Meadow", "Oak", "Ivy", "Wren", "Dove", "Olive", "Honey", "Ginger", 
    "Cinnamon", "Mocha", "Oreo", "Bubbles", "Twinkle", "Sunny", "Ziggy", "Squirt", "Nibbles", "Muffin", 
    "Teddy", "Boo", "Pip", "Thunder", "Bolt", "Ace", "Rocky", "Duke", "Atlas", "Bella", 
    "Max", "Charlie", "Lucy", "Cooper", "Daisy", "Buddy", "Molly", "Sadie", "Bear", "Bailey", 
    "Zoe", "Tucker", "Chloe", "Sophie", "Jack", "Leo", "Nala", "Jake", "Lily", "Winston", 
    "Ruby", "Coco", "Riley", "Maggie", "Henry", "Penny", "Finn", "Rosie", "Simba", "Gracie", 
    "Toby", "Lola", "Buster", "Chester", "Koda", "Dottie", "Shadow", "Sasha", "Peanut", "Juno", 
    "Piper", "Murphy", "Misty", "Chico", "Winnie", "Louie", "Mabel", "Ollie", "Roxie", "Rusty", 
    "Calypso", "Pudding", "Clara", "Fiona", "Zara", "Apollo", "Gizmo", "Scout", "Ellie", "Tilly", 
    "Rocco", "Lulu", "Archie", "Pippa", "Nina", "Eli", "Dash", "Niko", "Snickers", "Annie", 
    "Bruno", "Kiki", "Freya", "Dusty", "Biscuit", "Cleo", "Django", "Lucky", "Marley", "Cupcake", 
    "Maverick", "Zelda", "Sushi", "Indie", "Benny", "Remy", "Violet", "Marble", "Twinkie", "Taco", 
    "Pinky", "Flame", "Nimbus", "Blossom", "Bea", "Pebbles", "Taffy", "Waffles", "Pancake", "Socks", 
    "Flicka", "Cuddles", "Fluffy", "Sable", "Pumpkin", "Smokey", "Bowie", "Harper", "Perry", "Holly", 
    "Orion", "Ella", "Tango", "Roxy", "Moose", "Whimsy", "Sprout", "Snickerdoodle", "Mochi", "Maddie", 
    "Ember", "Truffle", "Sienna", "Fudge", "Bambi", "Fizz", "Yuki", "Pixie", "Pookie", "Sierra", 
    "Boogie", "Cosmo", "Doodle", "Baxter", "Nugget", "Harley", "Freddie", "Twilight", "Yoshi", "Nash", 
    "Sassy", "Toffee", "Ringo", "Harlow", "Otto", "Bongo", "Rascal", "Darla", "Flora", "Flick", 
    "Nino", "Gidget", "Chili", "Roscoe", "Jinx", "Clover", "Mango", "Fifi", "Dolly", "Otis", 
    "Angel", "Fido", "Jasmine", "Bunny", "Hank", "Mimi", "Puppy", "Pippin", "Candy", "Timmy"
];

const catDescriptions = [
    "He is a playful bundle of joy, always ready to chase after your heart!",
    "She is a little explorer on a mission to find the coziest spots in your home.",
    "This gentle soul has a knack for snuggling, perfect for lazy afternoons.",
    "A future lap warmer, skilled in purring and napping.",
    "This curious kitty loves to investigate every corner of your home.",
    "He is a sweet heart with a loud purr, guaranteed to brighten your day.",
    "She has an adventurous spirit, always seeking new heights and window views.",
    "A cuddle bug who adores attention and will follow you everywhere.",
    "This feline philosopher enjoys long naps and deep thoughts.",
    "He is an affectionate companion who thrives on belly rubs and treats.",
    "She is a cheeky rascal with a penchant for playful antics and mischief.",
    "This shy cutie will bloom with love and patience from the right family.",
    "A true lap cat who believes your lap is the best place to be.",
    "This little artist enjoys decorating your life with cat hair and chaos.",
    "He is a confident kitty who struts around like the ruler of the house.",
    "She is an intelligent furball, always ready to solve the mystery of the missing sock.",
    "A soft and cuddly friend who provides warmth on cold nights.",
    "This charmer has a knack for making new friends wherever they go.",
    "He is a spirited explorer who thrives on outdoor adventures (supervised, of course!).",
    "This little one is a master at finding the best sunny spots in the house.",
    "An endearing goofball, perfect for anyone who loves to laugh.",
    "She is a seasoned couch potato who dreams of treats and sunbeams.",
    "This vocal companion has lots to say and loves to chat with you.",
    "He is a gentle spirit who gets along well with other pets and kids.",
    "This playful kitten is a bundle of energy and curiosity.",
    "An elegant feline with a flair for the dramatic and a love for attention.",
    "She is a loyal friend who will greet you at the door every time.",
    "This little hunter loves to stalk toys and chase after string.",
    "He is an inquisitive kitty who’s always first to investigate new things.",
    "A sensitive soul who appreciates quiet moments and soft whispers.",
    "This adventurous pouncer loves climbing and exploring the great indoors.",
    "He is a fashion-forward feline with a unique personality and style.",
    "This sweet kitty is a master of the art of relaxation.",
    "An agile acrobat who loves to show off their skills.",
    "She is an affectionate furball who thrives on cuddles and companionship.",
    "This spirited companion is always ready for a good game of chase.",
    "He is a fluffy lap warmer who can’t resist a good snuggle session.",
    "This little comedian has a knack for making everyone smile.",
    "She is an introspective cat who enjoys peaceful moments of solitude.",
    "This curious cutie will keep you entertained with their antics.",
    "He is a loving companion who adores kids and other pets.",
    "This independent thinker enjoys observing the world from a safe distance.",
    "A social butterfly who loves meeting new people and making friends.",
    "This sweet little adventurer is always looking for a new game.",
    "He is a gentle giant who believes in love at first sight.",
    "This chatty cat loves to share their thoughts and stories with you.",
    "An expert napping buddy who believes in quality rest time.",
    "This delightful feline loves to pounce into your heart.",
    "A bright-eyed dreamer with a love for exploring every nook.",
    "This little fluffball is an instant mood booster with their antics.",
    "He is a calm and serene companion, perfect for quiet homes.",
    "This spunky kitty loves to chase shadows and sunbeams."
];

// Calculate the name of the pet from the pet ID
function generateRandomNameIndex(petIdString) {
    let sum = 0;
    for (let char of petIdString) {
        sum += char.charCodeAt(0);
    }
    const index = sum % petNames.length;

    console.log(`Pet name [${index}] = ${petNames[index]}`);

    return index;
}

function generateRandomCatDescIndex(petIdString) {
    let sum = 0;
    for (let char of petIdString) {
        sum += char.charCodeAt(0);
    }
    const index = sum % catDescriptions.length;

    console.log(`Pet name [${index}] = ${catDescriptions[index]}`);

    return index;
}



function getPetName(petId) {

    // Ensure that the pet ID is valid
    if (petId === null || petId === undefined) {
        throw new Error("Pet ID is invalid");
    }
    
    // Return the name of the pet
    return petNames[generateRandomNameIndex(petId)]
}

function getPetDescription(petId) {

    // Ensure that the pet ID is valid
    if (petId === null || petId === undefined) {
        throw new Error("Pet ID is invalid");
    }
    
    // Return the name of the pet
    return catDescriptions[generateRandomCatDescIndex(petId)]
}


console.log("Loaded petnames.js");