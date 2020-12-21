class Creature {
    constructor({ species, weight, height, diet }) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
    }

    compareWeight(otherCreature) {
        const otherWeight = otherCreature.weight;
        const otherSpecies = otherCreature.species;
        if (this.weight > otherWeight) {
            return `You are ${this.weight - otherWeight} pound${
                this.weight - otherWeight === 1 ? '' : 's'
            } heavier than ${otherSpecies}.`;
        }
        if (this.weight < otherWeight) {
            return `${otherSpecies} is ${otherWeight - this.weight} pound${
                otherWeight - this.weight === 1 ? '' : 's'
            } heavier than you.`;
        }
        return `You and ${otherSpecies} are exactly the same weight.`;
    }

    compareHeight(otherCreature) {
        const otherHeight = otherCreature.height;
        const otherSpecies = otherCreature.species;
        if (this.height > otherHeight) {
            return `You are ${this.height - otherHeight} inch${
                this.height - otherHeight === 1 ? '' : 'es'
            } taller than ${otherSpecies}.`;
        }
        if (this.height < otherHeight) {
            return `${otherSpecies} is ${otherHeight - this.height} inch${
                otherHeight - this.height === 1 ? '' : 'es'
            } taller than you.`;
        }
        return `You and ${otherSpecies} are exactly the same height.`;
    }

    compareDiet(otherCreature) {
        const diet = this.diet.toLowerCase();
        const otherDiet = otherCreature.diet.toLowerCase();
        const otherSpecies = otherCreature.species;
        if (diet !== otherDiet) {
            return `You are ${diet} but ${otherSpecies} is a${otherDiet === 'omnivore' ? 'n' : ''} ${otherDiet}.`;
        }
        return `You and ${otherSpecies} are both ${diet}s.`;
    }
}

// Create Dino Constructor
class Dinosaur extends Creature {
    constructor({ species, weight, height, diet, where, when, fact }) {
        super({ species, weight, height, diet });
        this.where = where;
        this.when = when;
        this.facts =
            species === 'Pigeon'
                ? [fact]
                : [fact, `${species} lived during the ${when} period.`, `${species} lived in ${where}.`];
    }
}

// Create Dino Objects
let dinosaurs = [];

const getDinoData = async () => {
    const fetchedData = await fetch('./dino.json');
    const data = await fetchedData.json();
    return data.Dinos;
};

window.onload = async () => {
    const dinoData = await getDinoData();
    dinosaurs = dinoData.map((dino) => new Dinosaur(dino));
};

// Create Human Object
class Human extends Creature {
    constructor({ name, weight, height, diet }) {
        super({ species: 'Human', weight, height, diet });
        this.name = name;
    }
}

function getRandomFact(human, dino) {
    const { facts } = dino;
    if (dino.species === 'Pigeon') {
        return facts[0];
    }
    facts.push(human.compareWeight(dino), human.compareHeight(dino), human.compareDiet(dino));
    return facts[Math.floor(Math.random() * facts.length)];
}

function createTile(title, image, fact) {
    const tile = document.createElement('div');
    tile.classList.add('grid-item');

    const tileTitle = document.createElement('h3');
    tileTitle.textContent = title;

    const tileImage = document.createElement('img');
    tileImage.src = image;
    tileImage.alt = title;

    tile.appendChild(tileTitle);
    tile.appendChild(tileImage);

    if (fact) {
        const tileFact = document.createElement('p');
        tileFact.textContent = fact;
        tile.appendChild(tileFact);
    }
    return tile;
}

// https://stackoverflow.com/a/46161940
const shuffledArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i -= 1) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[rand]] = [newArray[rand], newArray[i]];
    }
    return newArray;
};

// Generate Tiles for each Dino in Array
function createTiles(human, dinos) {
    const tiles = shuffledArray(dinos).map((dino) =>
        createTile(dino.species, `images/${dino.species}.png`, getRandomFact(human, dino))
    );
    tiles.splice(4, 0, createTile(human.name, `images/human.png`));
    return tiles;
}

function displayInfographic(human, dinos) {
    const grid = document.getElementById('grid');
    createTiles(human, dinos).forEach((tile) => grid.appendChild(tile));
}

function getFormData(form) {
    return {
        name: form.name.value,
        feet: Number(form.feet.value),
        inches: Number(form.inches.value),
        weight: Number(form.weight.value),
        diet: form.diet.value,
    };
}

function validateFormData({ name, feet, inches, weight }) {
    if (!!name && feet >= 0 && inches >= 0 && weight >= 0) {
        return true;
    }
    alert('Data in the form is not valid!');
    return false;
}

// On button click, prepare and display infographic
// Use IIFE to get human data from form
document.getElementById('btn').addEventListener('click', () => {
    const form = document.getElementById('dino-compare');
    const formData = getFormData(form);
    if (!validateFormData(formData)) {
        // Data in form is invalid, return from function immediately without displaying infographic
        return;
    }
    // Remove form from screen
    form.style.display = 'none';
    const humanData = (({ name, feet, inches, weight, diet }) => ({
        name,
        height: feet * 12 + inches,
        weight,
        diet,
    }))(formData);
    displayInfographic(new Human(humanData), dinosaurs);
});
