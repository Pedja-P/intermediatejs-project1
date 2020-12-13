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
        this.fact = fact;
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
    console.log(dinosaurs);
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

// Use IIFE to get human data from form
document.getElementById('btn').addEventListener('click', function () {
    const humanData = (() => {
        const form = document.getElementById('dino-compare');
        return {
            name: form.name.value,
            height: Number(form.feet.value) * 12 + Number(form.inches.value),
            weight: Number(form.weight.value),
            diet: form.diet.value,
        };
    })();
    const human = new Human(humanData);
    console.log(human);
});

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
    const humanDiet = human.diet.toLowercase();
    const dinosaurDiet = dinosaur.diet.toLowercase();
    const dinosaurSpecies = dinosaur.species;
    if (humanDiet !== dinosaurDiet) {
        return `You are ${humanDiet} but ${dinosaurSpecies} is a${
            dinosaurDiet === 'omnivore' ? 'n' : ''
        } ${dinosaurDiet}.`;
    }
    return `You and ${dinosaurSpecies} are both ${humanDiet}s.`;
}

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
