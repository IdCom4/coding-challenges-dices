"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function Memoize() {
    const memoizedData = new Map();
    return (target, key, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = (total, numberOfDices, numberOfFace) => {
            const formattedKey = JSON.stringify({ output: total, numberOfDices });
            const storedData = memoizedData.get(formattedKey);
            if (storedData)
                return storedData;
            const result = originalMethod.apply(target, [total, numberOfDices, numberOfFace]);
            memoizedData.set(formattedKey, result);
            return result;
        };
        return descriptor;
    };
}
class DecoratorWrapper {
    static getTotalPossibleConfigurations(total, numberOfDices, numberOfFace = 6) {
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
            nbrConfigurations += DecoratorWrapper.getTotalPossibleConfigurations(total - diceValue, numberOfDices - 1, numberOfFace);
        return nbrConfigurations;
    }
}
__decorate([
    Memoize()
], DecoratorWrapper, "getTotalPossibleConfigurations", null);
exports.default = DecoratorWrapper.getTotalPossibleConfigurations;
