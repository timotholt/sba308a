// From a pet ID, generate a pet name
export  { getPetName }

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

function getPetName(petId) {

    // Ensure that the pet ID is valid
    if (petId === null || petId === undefined) {
        throw new Error("Pet ID is invalid");
    }

    // Calculate the name of the pet from the pet ID
        function generateRandomIndex(petIdString) {
        let sum = 0;
        for (let char of petIdString) {
            sum += char.charCodeAt(0);
        }
        const index = sum % petNames.length;

        return index;
    }
    
    // Return the name of the pet
    return petNames[generateRandomIndex(petId)]
}

console.log("goodbye from petnames.js");