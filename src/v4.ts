import { PROBABILITY } from "./common"

export default function getTotalPossibleConfigurations(total: number, numberOfDices: number, numberOfFace = 6): number {

  const invalidInputs = numberOfDices < 1 || total < 1
    const impossibleDices = numberOfFace < 1
  const tooMuchDices = total < numberOfDices
  const notEnoughDices = total > numberOfDices * numberOfFace

  if (invalidInputs || impossibleDices || tooMuchDices || notEnoughDices) return PROBABILITY.NONE

  if (numberOfDices === 1) return 1

  let nbrConfigurations = 0
  for (let diceValue = 1; diceValue <= numberOfFace && diceValue < total; diceValue++) 
    nbrConfigurations +=  getTotalPossibleConfigurations(total - diceValue, numberOfDices - 1, numberOfFace)


  return nbrConfigurations
}