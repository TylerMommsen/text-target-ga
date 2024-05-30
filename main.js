// genetic algorithm variables
let targetPhrase = "";
let currentBestPhrase = "";
let generationUntilFirstMatchCounter = 1;
let generationUntilAllMatchCounter = 1;
let populationSize = 100;
let averageFitness = 0;
let mutationRate = 0.1;

// population class variable
let population;

let algorithmRunning = false;

// inputs
const targetPhraseInput = document.getElementById("target-phrase-input");
const startAlgorithmBtn = document.getElementById("start-algorithm-btn");

// genetic algorithm information
let targetPhraseDisplay = document.getElementById("target-phrase");
let currentBestPhraseDisplay = document.getElementById("current-best-phrase");
let generationUntilFirstMatchDisplay = document.getElementById("generation-first-counter");
let generationUntilAllMatchDisplay = document.getElementById("generation-all-counter");
let populationSizeDisplay = document.getElementById("population-size");
let averageFitnessDisplay = document.getElementById("average-fitness");
let mutationRateDisplay = document.getElementById("mutation-rate");

// population display
const populationContainer = document.getElementById("population-container");

startAlgorithmBtn.addEventListener("click", () => {
	if (targetPhraseInput.value === "" || algorithmRunning) {
		return;
	} else {
		algorithmRunning = true;
		startAlgorithmBtn.style.backgroundColor = "#888";
		targetPhrase = targetPhraseInput.value;

		// reset values
		currentBestPhrase = "";
		generationUntilFirstMatchCounter = 1;
		generationUntilAllMatchCounter = 1;
		populationSize = 100;
		averageFitness = 0;
		mutationRate = 0.1;

		updateGeneticInfoDisplay();
	}

	population = new Population(populationSize, targetPhrase);
	runGeneticEvolution();
});

function runGeneticEvolution() {
	// run the algorithm until every phrase in the population matches the target phrase
	if (!population.allMatched) {
		population.allPhrasesMatch(); // check if all phrases match the target
		displayPopulation(); // display all the phrases on the screen
		population.calculateFitness(); // calculate the fitness of every phrase to see how close it is to the target
		population.getAverageFitnessSum(); // get the average fitness of the population
		if (!population.foundFirstMatch) {
			population.setBestPhrase(); // set the current best phrase based on fitness
		}
		population.nextGeneration(); // create a new population of phrases based on the best of the last generation
		if (!population.foundFirstMatch) {
			generationUntilFirstMatchCounter++;
		}
		generationUntilAllMatchCounter++;
		currentBestPhrase = population.bestPhrase.dna;
		averageFitness = population.averageFitness;
		updateGeneticInfoDisplay();

		setTimeout(runGeneticEvolution, 50);
	} else {
		algorithmRunning = false;
		startAlgorithmBtn.style.backgroundColor = "#00b800";
	}
}

function displayPopulation() {
	populationContainer.innerHTML = "";
	for (let i = 0; i < population.phrases.length; i++) {
		const phrase = population.phrases[i];
		const phraseElement = document.createElement("p");
		phraseElement.innerHTML = phrase.dna;
		populationContainer.appendChild(phraseElement);
	}
}

// setup all the genetic algorithm information displays
function updateGeneticInfoDisplay() {
	targetPhraseDisplay.innerText = "Target Phrase: " + targetPhraseInput.value;
	currentBestPhraseDisplay.innerText = "Current Best: " + currentBestPhrase;
	generationUntilFirstMatchDisplay.innerText =
		"Generation Until First Match: " + generationUntilFirstMatchCounter;
	generationUntilAllMatchDisplay.innerText =
		"Generation Until All Match: " + generationUntilAllMatchCounter;
	populationSizeDisplay.innerText = "Population: " + populationSize;
	averageFitnessDisplay.innerText = "Average Fitness: " + averageFitness + "%";
	mutationRateDisplay.innerText = "Mutation Rate: " + mutationRate * 100 + "%";
}
