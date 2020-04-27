const sortBy = require('lodash/sortBy');
const chunk = require('lodash/chunk');
const head = require('lodash/head');
const Utils = require("./Utils");
const Individual = require("./OneIndividual");

class Var14Algorithm {
    constructor() {
        this.population = new Array(20);
        this.stopRule = 100;
        this.adjustmentStreak = 0;
        this.previousPopulationAdjustmentIndivid = null;
    }

    getFirstPopulation() {
        for (let i = 0; i < 20; i++) {
            this.population[i] = new Individual(Utils.getRandomInt(32768) + 32767);
        }
    }

    getNextPopulation() {
        this.population = Utils.getUniquePopulation(this.population);
        this.getParents();
    }

    getParents() {
        const currentPopulation = this.population,
            nextParent = [];
        for (let i = 0; i < currentPopulation.length; i++) {
            let {firstNumber: firstNumber, secondNumber: secondNumber} = Utils.getTwoUniqueNumbers(currentPopulation.length);
            nextParent.push(currentPopulation[firstNumber].quantityOfOnes >= currentPopulation[secondNumber].quantityOfOnes ? currentPopulation[firstNumber] : currentPopulation[secondNumber]);
        }
        this.getChildren(nextParent);
    }

    getChildren(parents) {
        let children = [],
            firstParentArray,
            secondParentArray,
            temp;

        for (let i = 0; i < parents.length; i++) {
            let {firstNumber: firstParent, secondNumber: secondParent} = Utils.getTwoUniqueNumbers(parents.length);
            firstParentArray = Array.from(parents[firstParent].binaryNumber);
            temp = firstParentArray;
            secondParentArray = Array.from(parents[secondParent].binaryNumber);
            let {firstNumber: firstPoint, secondNumber: secondPoint} = Utils.getTwoUniqueNumbers(16);
            for (let i = firstPoint; i <= secondPoint; i++) {
                firstParentArray[i] = secondParentArray[i];
                secondParentArray[i] = temp[i];
            }
            children.push(firstParentArray.join(''));
            children.push(secondParentArray.join(''));
        }

        children.forEach(children => this.population.push(new Individual(parseInt(children, 2))));
        for (let i = this.population.length; this.population.length - i >= children.length; i++) {
            this.population[i].mutate(0.03);
        }
    }

    getAdjustment() {
        let {population: sortedPopulation} = this;
        sortedPopulation = sortBy(sortedPopulation, (elem) => elem.originGeneratedNumber * -1);
        return head(sortedPopulation).originGeneratedNumber;
    }

    isAdjustmentFound() {
        if (this.getAdjustment() === this.previousPopulationAdjustmentIndivid) {
            this.adjustmentStreak++;
        } else {
            this.adjustmentStreak = 0;
            this.previousPopulationAdjustmentIndivid = this.getAdjustment();
        }
        return this.adjustmentStreak >= this.stopRule;
    }

    getOptimalSolution() {
        let population = 0;
        while (!this.isAdjustmentFound()) {
            this.getNextPopulation();
            population++;
            console.log(`Population number is: №${population}`);
        }
        console.log(this.getAdjustment());
    }
}

const algorithm = new Var14Algorithm();
algorithm.getFirstPopulation();
algorithm.getOptimalSolution();