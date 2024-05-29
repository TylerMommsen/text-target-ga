// this is the class that handles the genetic evolution
class Population {
	constructor(populationSize, targetPhrase) {
		this.populationSize = populationSize;
		this.targetPhrase = targetPhrase;

		this.phrases = [];
		this.fitnessSum = 0;
		this.averageFitness = 0;
		this.bestPhrase = null;

		this.done = false;

		this.createInitialPopulation();
	}

	// create the initial population of players with a whole bunch of random characters
	createInitialPopulation() {
		for (let i = 0; i < this.populationSize; i++) {
			this.phrases.push(new Phrase(this.targetPhrase));
		}
	}

	// calculate the fitness for each phrase i.e how close it matches to the target
	calculateFitness() {
		for (let i = 0; i < this.phrases.length; i++) {
			this.phrases[i].calculateFitness();
		}
	}

	// get the average fitness of the whole population of phrases
	getAverageFitnessSum() {
		let fitnessSum = 0;
		for (let i = 0; i < this.phrases.length; i++) {
			fitnessSum += this.phrases[i].fitness;
		}

		this.fitnessSum = fitnessSum;
		this.averageFitness = fitnessSum / this.phrases.length;
	}

	// the phrase with the highest fitness is selected as the best phrase
	setBestPhrase() {
		let highestFitness = 0;
		let bestPhrase = "";
		for (let i = 0; i < this.phrases.length; i++) {
			if (this.phrases[i].fitness > highestFitness) {
				highestFitness = this.phrases[i].fitness;
				bestPhrase = this.phrases[i];
			}
		}

		this.bestPhrase = bestPhrase;
	}

	allPhrasesMatch() {
		for (let i = 0; i < this.phrases.length; i++) {
			if (this.phrases[i].checkIfMatchedTarget() === false) {
				return;
			}
		}

		// if reached here, then all phrases have matched the target phrase
		this.done = true;
	}

	// generate the next generation of phrases
	nextGeneration() {
		let children = [];

		for (let i = 0; i < this.phrases.length; i++) {
			children.push(this.reproduce());
		}

		this.phrases = [];

		// update the phrases population with the new population
		this.phrases = children;
	}

	// pick a phrase from the total population based on fitness
	reproduce() {
		let rand = Math.random() * this.fitnessSum;
		let runningSum = 0;
		let chosenPhrase = null;

		for (let i = 0; i < this.phrases.length; i++) {
			runningSum += this.phrases[i].fitness;
			if (runningSum > rand) {
				chosenPhrase = this.phrases[i].clone();
				break;
			}
		}

		if (chosenPhrase && !chosenPhrase.matchedTarget) {
			chosenPhrase.mutate();
		}

		return chosenPhrase;
	}
}
