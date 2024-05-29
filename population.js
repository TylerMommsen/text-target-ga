// this is the class that handles the genetic evolution
class Population {
	constructor(populationSize, targetPhrase) {
		this.populationSize = populationSize;
		this.targetPhrase = targetPhrase;

		this.population = [];

		this.createInitialPopulation();
	}

	// create the initial population of players with a whole bunch of random characters
	createInitialPopulation() {
		for (let i = 0; i < this.populationSize; i++) {
			this.population.push(new Phrase(this.targetPhrase));
		}
	}
}
