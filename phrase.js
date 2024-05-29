// this class represents a phrase/word in the
// whole population, so a population of 'phrases' will be
// created and they will constantly evolve until a 'phrase' matches the
// target phrase/word
class Phrase {
	constructor(target, dna = null) {
		this.target = target; // the target phrase
		this.targetLength = target.length;

		if (dna !== null) {
			this.dna = dna;
		} else {
			this.dna = ""; // the current phrase/word, this is their 'DNA'
			this.generateRandomInitialPhrase();
		}

		this.fitness = 1;
		this.matchedTarget = false;
	}

	generateRandomInitialPhrase() {
		for (let i = 0; i < this.targetLength; i++) {
			this.dna += this.getRandomCharacter();
		}
	}

	getRandomCharacter() {
		const chars =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:',.<>/?`~ ";
		return chars[Math.floor(Math.random() * chars.length)];
	}

	// calculate how close this phrase is to the target phrase, represented as 'fitness'
	calculateFitness() {
		let newFitness = 1;
		for (let i = 0; i < this.dna.length; i++) {
			let currLetter = this.dna[i];

			if (currLetter === this.target[i]) {
				newFitness += 1;
			}
		}

		this.fitness = newFitness;
	}

	// checks if the phrase matches the target phrase
	checkIfMatchedTarget() {
		if (this.dna === this.target) {
			this.matchedTarget = true;
			return true;
		}
		return false;
	}

	// loop through every letter and have a chance of changing the letter randomly
	mutate() {
		let dnaArray = this.dna.split(""); // Convert string to array to allow modifications
		for (let i = 0; i < dnaArray.length; i++) {
			if (dnaArray[i] === this.target[i]) continue;

			if (Math.random() < mutationRate) {
				dnaArray[i] = this.getRandomCharacter();
			}
		}
		this.dna = dnaArray.join("");
	}

	clone() {
		let newPhrase = new Phrase(this.target, this.dna);
		return newPhrase;
	}
}
