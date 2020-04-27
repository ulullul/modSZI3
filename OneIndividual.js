const split = require('lodash/split');
const join = require('lodash/join');
const utils = require("./Utils");

class OneIndividual {
  constructor(individual) {
    this.originGeneratedNumber = individual;
    this.binaryNumber = individual.toString(2);
    this.quantityOfOnes = (this.binaryNumber.match(/1/g) || []).length;
  }
  mutate(mutationProbability) {
    let rand = utils.getRandomInt(100);
    if (rand <= mutationProbability) {
      let genToBeChanged = utils.getRandomInt(16);
      if (this.binaryNumber[genToBeChanged] === "0") {
        const splitted = split(this.binaryNumber, "");
        splitted[genToBeChanged] = "1";
        this.binaryNumber = join(splitted, "");
      } else if (this.binaryNumber[genToBeChanged] === "1") {
        const splitted = split(this.binaryNumber, "");
        splitted[genToBeChanged] = "0";
        this.binaryNumber = join(splitted, "");
      }
    }
  }
}

module.exports = OneIndividual;
