'use strict';

// Create Dino Constructor
class Dinosaur {
    constructor({ species, weight, height, diet, where, when, fact }) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.facts =
            species !== 'Pigeon'
                ? [fact, `${species} lived during the ${when} period.`, `${species} lived in ${where}.`]
                : [fact];
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
class Human {
    constructor({ name, weight, height, diet }) {
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
    }
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs.
function compareWeight(human, dinosaur) {
    const humanWeight = human.weight;
    const dinosaurWeight = dinosaur.weight;
    const dinosaurSpecies = dinosaur.species;
    if (humanWeight > dinosaurWeight) {
        return `You are ${humanWeight - dinosaurWeight} pound${
            humanWeight - dinosaurWeight === 1 ? '' : 's'
        } heavier than ${dinosaurSpecies}.`;
    } else if (humanWeight < dinosaurWeight) {
        return `${dinosaurSpecies} is ${dinosaurWeight - humanWeight} pound${
            dinosaurWeight - humanWeight === 1 ? '' : 's'
        } heavier than you.`;
    } else {
        return `You and ${dinosaurSpecies} are exactly the same weight.`;
    }
}

// Create Dino Compare Method 2
// NOTE: Height in JSON file is in inches.
function compareHeight(human, dinosaur) {
    const humanHeight = human.height;
    const dinosaurHeight = dinosaur.height;
    const dinosaurSpecies = dinosaur.species;
    if (humanHeight > dinosaurHeight) {
        return `You are ${humanHeight - dinosaurHeight} inch${
            humanHeight - dinosaurHeight === 1 ? '' : 'es'
        } taller than ${dinosaurSpecies}.`;
    } else if (humanHeight < dinosaurHeight) {
        return `${dinosaurSpecies} is ${dinosaurHeight - humanHeight} inch${
            dinosaurHeight - humanHeight === 1 ? '' : 'es'
        } taller than you.`;
    } else {
        return `You and ${dinosaurSpecies} are exactly the same height.`;
    }
}

// Create Dino Compare Method 3
function compareDiet(human, dinosaur) {
    const humanDiet = human.diet.toLowerCase();
    const dinosaurDiet = dinosaur.diet.toLowerCase();
    const dinosaurSpecies = dinosaur.species;
    if (humanDiet !== dinosaurDiet) {
        return `You are ${humanDiet} but ${dinosaurSpecies} is a${
            dinosaurDiet === 'omnivore' ? 'n' : ''
        } ${dinosaurDiet}.`;
    }
    return `You and ${dinosaurSpecies} are both ${humanDiet}s.`;
}

function getRandomFact(human, dinosaur) {
    const facts = dinosaur.facts;
    if (dinosaur.species === 'Pigeon') {
        return facts[0];
    }
    facts.push(compareWeight(human, dinosaur), compareHeight(human, dinosaur), compareDiet(human, dinosaur));
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
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[rand]] = [newArray[rand], newArray[i]];
    }
    return newArray;
};

// Generate Tiles for each Dino in Array
function createTiles(human, dinosaurs) {
    const tiles = shuffledArray(dinosaurs).map((dino) =>
        createTile(dino.species, `images/${dino.species}.png`, getRandomFact(human, dino))
    );
    tiles.splice(4, 0, createTile(human.name, `images/human.png`));
    return tiles;
}

function displayInfographic(human, dinosaurs) {
    const grid = document.getElementById('grid');
    createTiles(human, dinosaurs).forEach((tile) => grid.appendChild(tile));
}

// Remove form from screen
function removeForm(form) {
    form.style.display = 'none';
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
document.getElementById('btn').addEventListener('click', function () {
    const form = document.getElementById('dino-compare');
    const formData = getFormData(form);
    if (!validateFormData(formData)) {
        // Data in form is invalid, return from function immediately without displaying infographic
        return;
    }
    const humanData = (({ name, feet, inches, weight, diet }) => ({
        name,
        height: feet * 12 + inches,
        weight,
        diet,
    }))(formData);
    removeForm(form);
    displayInfographic(new Human(humanData), dinosaurs);
});
