import { PROBABILITY } from "./common"

function getCurrentConfigurationOutput(dices: number[]) {
  return dices.reduce((currentTotal, nextValue) => currentTotal + nextValue, 0)
}

function goToNextConfigurations(dices: number[], numberOfFace: number) {
  let offsetIndex = 1
  let wantedIndex = dices.length - offsetIndex

  while (wantedIndex >= 0) {
    if (dices[wantedIndex] < numberOfFace) {
      dices[wantedIndex]++
      break
    }
 
    dices[wantedIndex] = 1
    wantedIndex--
  }
}

export default function getTotalPossibleConfigurations(total: number, numberOfDices: number, numberOfFace = 6): number {
  const invalidInputs = numberOfDices < 1 || total < 1
    const impossibleDices = numberOfFace < 1
  const tooMuchDices = total < numberOfDices
  const notEnoughDices = total > numberOfDices * numberOfFace

  if (invalidInputs || impossibleDices || tooMuchDices || notEnoughDices) return PROBABILITY.NONE

  const dices: number[] = new Array<number>(numberOfDices).fill(1)

  let nbrConfigurations = 0
  let currentConfigurationOutput = numberOfDices

  while (currentConfigurationOutput < numberOfDices * numberOfFace) {
    
    currentConfigurationOutput = getCurrentConfigurationOutput(dices)

    if (currentConfigurationOutput === total) nbrConfigurations++

    goToNextConfigurations(dices, numberOfFace)
  }

  return nbrConfigurations
}