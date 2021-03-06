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
const methods = {
    eat(human){
        if (human.diet !== 'Herbavor') {
            return this.diet ==='carnivor' ? 'We can eat each other' : 'Don\'t eat me!';
        }
        return this.diet ==='carnivor' ? 'I will eat you' : 'I am a vegetarian too';
    },
    howFat(human){
        const dinoWeight = parseInt(this.weight);
        if (dinoWeight > human.weight) {
            return `I'm ${(dinoWeight/human.weight).toFixed(2)} times heavier than you`;
        }else if (dinoWeight < human.weight) {
            return `I'm ${(human.weight/dinoWeight).toFixed(2)} times lighter than you`;
        }
        return 'We have the same weight!';
    },
    howTall(human){
        const dinoHeight = parseInt(this.height);
        if (dinoHeight > human.height) {
            return `I'm ${(dinoHeight/human.height).toFixed(2)} times taller than you`;
        }else if (dinoHeight < human.height) {
            return `You are ${(human.height/dinoHeight).toFixed(2)} times taller than me`;
        }
        return 'We have the same weight!';
    }
};

function dinoFactory(dino, human){
    const mixed = Object.assign(dino, methods);

    // props except species
    let facts = Object.keys(mixed);
    facts.splice(facts.indexOf('species'), 1);

    const randomFact = () => {
        if (mixed.species === 'Pigeon') {
            return 'All birds are considered dinosaurs.';
        }

        const fact = facts[Math.floor(Math.random() * facts.length)];
        return typeof mixed[fact] === 'function' ? mixed[fact](human) : mixed.fact; 
    };

    return {
        species: () => mixed.species,
        fact: () => randomFact()
    }
}

let compared = [];

document.getElementById('btn').addEventListener('click', ()=> {
    const name = document.getElementById('name').value;
    const feet = document.getElementById('feet').value;
    const inches = document.getElementById('inches').value;
    const weight = document.getElementById('weight').value;
    const diet = document.getElementById('diet').value;
    const height = parseInt(feet) * 12 + parseInt(inches);  // height in inches

    if( !name || (!feet && !inches)|| !weight) return;
    const humanData = {
        species: 'human',
        name: name,
        weight: weight,
        height: height,
        diet: diet
    }
    for(const dino of Dinos){
        compared.push(dinoFactory(dino, humanData));
    }
    compared = shuffle(compared);
    compared.splice(4, 0, humanData) // locate human center

    let dinoTiles = '';
    for(const dino of compared){
        dinoTiles += '<div class="grid-item">';
        if (dino.species === 'human') {
            dinoTiles += `<img src="images/${dino.species}.png" alt=""><h3>${dino.name}</h3><p></p>`;
        }else{
            // species, name, img, fact
            dinoTiles += `<img src="images/${dino.species()}.png" alt=""><h3>${dino.species()}</h3><p>${dino.fact()}<br>`;
        }
        dinoTiles += '</p></div>';
    }

    document.getElementById('grid').innerHTML = dinoTiles;
    document.getElementById('dino-compare').remove();
})

// returns new shuffled array not mutating original arr
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
