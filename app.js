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
        return `You are ${humanWeight - dinosaurWeight} pounds heavier than ${dinosaurSpecies}.`;
    } else if (humanWeight < dinosaurWeight) {
        return `${dinosaurSpecies} is ${dinosaurWeight - humanWeight} pounds heavier than you.`;
    } else {
        return `You and ${dinosaurSpecies} are exactly the same weight.`;
    }
}

// Create Dino Compare Method 2
// NOTE: Height in JSON file is in inches.

// Create Dino Compare Method 3

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
