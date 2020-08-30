const dinoData = {
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]
}
    // Create Dino Constructor
    // Create Dino Objects

const {Dinos} = dinoData;

function dinoFactory(dino, human){
    const methods = {
        eat(){
            if (human.diet !== 'Herbavor') {
                return dino.diet ==='carnivor' ? 'We can eat each other' : 'Don\'t eat me!';
            }
            return dino.diet ==='carnivor' ? 'I will eat you' : 'I am a vegetarian too';
        },
        howFat(){
            if (dino.weight > human.weight) {
                return `I'm ${(dino.weight/human.weight).toFixed(2)} times heavier than you`;
            }else if (dino.weight < human.weight) {
                return `I'm ${(human.weight/dino.weight).toFixed(2)} times lighter than you`;
            }
            return 'We have the same weight!';
        },
        howTall(){
            if (dino.height > human.height) {
                return `I'm ${(dino.height/human.height).toFixed(2)} times taller than you`;
            }else if (dino.height < human.height) {
                return `You are ${(human.height/dino.height).toFixed(2)} times taller than me`;
            }
            return 'We have the same weight!';
        }
    }

    // random props except species
    let randomProps = shuffle(Object.keys(dino));
    if (randomProps.indexOf('species') !== -1) {
        randomProps.splice(randomProps.indexOf('species'), 1);
    }
    randomProps = randomProps.slice(0,3);

    // random facts values array
    let randomFacts = [];
    for(const f of randomProps){
        randomFacts.push(`${f}: ${dino[f]}`)
    }

    const mixed = Object.assign(dino, methods);

    return {
        species: () => mixed.species,
        random: () => randomFacts,
        eat: () => mixed.eat(),
        howFat: () => mixed.howFat(),
        howTall: () => mixed.howTall()
    }
}

let compared = [];

document.getElementById('btn').addEventListener('click', ()=> {
    let name = document.getElementById('name').value;
    let feet = document.getElementById('feet').value;
    let inches = document.getElementById('inches').value;
    let weight = document.getElementById('weight').value;
    let diet = document.getElementById('diet').value;
    let height = feet * 12 + inches;  // height in inches

    if( !name || (!feet && !inches)|| !weight) return;
    const humanData = {
        name: name,
        weight: weight,
        height: height,
        diet: diet
    }
    // const human = dinoFactory(humanData);
    for(const dino of Dinos){
        compared.push(dinoFactory(dino, humanData));
    }

    let dinoTiles = '';
    for(const dino of compared){
        console.log(dino.random())
        // species, name, img, 3 methods
        dinoTiles += `<div class="grid-item"><img src="images/${dino.species()}.png" alt=""><h3>${dino.species()}</h3><p>${dino.eat()}<br>${dino.howFat()}<br>${dino.howTall()}<br>`;
        // random facts
        for (const i of dino.random()) {
            dinoTiles += `${i}<br>`
        }
        dinoTiles += '</p></div>';
    }

    document.getElementById('grid').innerHTML = dinoTiles;
})
    
function shuffle(arr){
    let _arr = arr.slice(); // to shallow copy
    let shuffled = [];
    for (let i = _arr.length - 1; i >= 0; i--) {
        let last = _arr[i];
        let randIndex = Math.floor(Math.random() * i);
        _arr[i] = _arr[randIndex];
        _arr[randIndex] = last;

        shuffled.push(_arr.pop())
    }
    return shuffled;
}

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
