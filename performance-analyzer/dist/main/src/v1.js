"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentConfigurationOutput(dices) {
    return dices.reduce((currentTotal, nextValue) => currentTotal + nextValue, 0);
}
function goToNextConfigurations(dices, numberOfFace) {
    let offsetIndex = 1;
    let wantedIndex = dices.length - offsetIndex;
    while (wantedIndex >= 0) {
        if (dices[wantedIndex] < numberOfFace) {
            dices[wantedIndex]++;
            break;
        }
        dices[wantedIndex] = 1;
        wantedIndex--;
    }
}
function getTotalPossibleConfigurations(total, numberOfDices, numberOfFace = 6) {
    const invalidInputs = numberOfDices < 1 || total < 1;
    const impossibleDices = numberOfFace < 1;
    const tooMuchDices = total < numberOfDices;
    const notEnoughDices = total > numberOfDices * numberOfFace;
    if (invalidInputs || impossibleDices || tooMuchDices || notEnoughDices)
        return 0;
    const dices = new Array(numberOfDices).fill(1);
    let nbrConfigurations = 0;
    let currentConfigurationOutput = numberOfDices;
    while (currentConfigurationOutput < numberOfDices * numberOfFace) {
        currentConfigurationOutput = getCurrentConfigurationOutput(dices);
        if (currentConfigurationOutput === total)
            nbrConfigurations++;
        goToNextConfigurations(dices, numberOfFace);
    }
    return nbrConfigurations;
}
exports.default = getTotalPossibleConfigurations;
