"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTotalPossibleConfigurations(total, numberOfDices, numberOfFace = 6) {
    const invalidInputs = numberOfDices < 1 || total < 1;
    const impossibleDices = numberOfFace < 1;
    const tooMuchDices = total < numberOfDices;
    const notEnoughDices = total > numberOfDices * numberOfFace;
    if (invalidInputs || impossibleDices || tooMuchDices || notEnoughDices)
        return 0;
    if (numberOfDices === 1)
        return 1;
    let nbrConfigurations = 0;
    for (let diceValue = 1; diceValue <= numberOfFace && diceValue < total; diceValue++)
        nbrConfigurations += getTotalPossibleConfigurations(total - diceValue, numberOfDices - 1, numberOfFace);
    return nbrConfigurations;
}
exports.default = getTotalPossibleConfigurations;
