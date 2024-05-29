// this class represents a phrase/word in the
// whole population, so a population of 'phrases' will be
// created and they will constantly evolve until a 'phrase' matches the
// target phrase/word
class Phrase {
	constructor(target) {
		this.target = target; // the target phrase
		this.targetLength = target.length;

		this.dna = ""; // the current phrase/word, this is their 'DNA'
		this.fitness = 0;

		this.generateRandomInitialPhrase();
	}

	generateRandomInitialPhrase() {
		for (let i = 0; i < this.targetLength; i++) {
			this.dna += this.getRandomCharacter();
		}
	}

	getRandomCharacter() {
		const chars =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:',.<>/?`~";
		return chars[Math.floor(Math.random() * chars.length)];
	}
}
