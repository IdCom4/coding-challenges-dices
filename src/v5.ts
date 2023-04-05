import { PROBABILITY } from "./common"

function Memoize() {

  const memoizedData = new Map<string, number>()

  return (target: any, key: string, descriptor: any) => {
    const originalMethod = descriptor.value; 

    descriptor.value = (total: number, numberOfDices: number, numberOfFace: number) => {
 
      const formattedKey = JSON.stringify({ output: total, numberOfDices })
      const storedData = memoizedData.get(formattedKey)

      if (storedData) return storedData
      
      const result = originalMethod.apply(target, [total, numberOfDices, numberOfFace]);
      memoizedData.set(formattedKey, result)
      return result
    }

    return descriptor;
  }
}

class DecoratorWrapper {

  @Memoize()
  static getTotalPossibleConfigurations(total: number, numberOfDices: number, numberOfFace = 6): number {

    const invalidInputs = numberOfDices < 1 || total < 1
    const impossibleDices = numberOfFace < 1
    const tooMuchDices = total < numberOfDices
    const notEnoughDices = total > numberOfDices * numberOfFace

    if (invalidInputs || impossibleDices || tooMuchDices || notEnoughDices) return PROBABILITY.NONE

    if (numberOfDices === 1) return 1

    let nbrConfigurations = 0
    for (let diceValue = 1; diceValue <= numberOfFace && diceValue < total; diceValue++) 
      nbrConfigurations +=  DecoratorWrapper.getTotalPossibleConfigurations(total - diceValue, numberOfDices - 1, numberOfFace)


    return nbrConfigurations
  }
}

export default DecoratorWrapper.getTotalPossibleConfigurations