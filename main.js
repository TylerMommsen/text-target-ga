let populationSize = 10;
let mutationRate = 0.01;
let targetPhrase = "donuts";

const startAlgorithmBtn = document.getElementById("start-algorithm-btn");
const stopAlgorithmBtn = document.getElementById("stop-algorithm-btn");

startAlgorithmBtn.addEventListener("click", () => {
	runGeneticEvolution();
});

function runGeneticEvolution() {
	const population = new Population(populationSize, targetPhrase);
	console.log(population);
}
