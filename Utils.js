const uniqBy = require('lodash/uniqBy');
class Utils {
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }

    getUniquePopulation(currentPopulation) {
        return uniqBy(currentPopulation, "originGeneratedNumber");
    }

    getTwoUniqueNumbers(max) {
        let firstNumber = this.getRandomInt(max);
        let secondNumber = this.getRandomInt(max);
        if (firstNumber > secondNumber) {
            let temp = firstNumber;
            firstNumber = secondNumber;
            secondNumber = temp;
        }
        while (firstNumber === secondNumber) {
            secondNumber = utils.getRandomInt(max);
            if (firstNumber > secondNumber) {
                let temp = firstNumber;
                firstNumber = secondNumber;
                secondNumber = temp;
            }
        }
        return {
            firstNumber,
            secondNumber,
        }
    }
}

const utils = new Utils();

module.exports = utils;
