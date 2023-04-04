import { PROBABILITY } from "./common"

function getCurrentConfigurationOutput(dices: number[]) {
  return dices.reduce((currentTotal, nextValue) => currentTotal + nextValue, 0)
}

function goToNextConfigurations(dices: number[], diceMaxValue: number) {
  let offsetIndex = 1
  let wantedIndex = dices.length - offsetIndex

  while (wantedIndex >= 0) {
    if (dices[wantedIndex] < diceMaxValue) {
      dices[wantedIndex]++
      break
    }
 
    dices[wantedIndex] = 1
    wantedIndex--
  }
}

export function getDicesNumberOfConfigurationsForOutput(output: number, diceAmount: number, diceMaxValue = 6): number {
  if (diceAmount < 1 || output < 1) return PROBABILITY.NONE
  if (output < diceAmount) return PROBABILITY.NONE
  if (output > diceAmount * diceMaxValue) return PROBABILITY.NONE

  const dices: number[] = new Array<number>(diceAmount).fill(1)

  let nbrConfigurations = 0
  let currentConfigurationOutput = diceAmount

  while (currentConfigurationOutput < diceAmount * diceMaxValue) {
    
    currentConfigurationOutput = getCurrentConfigurationOutput(dices)

    if (currentConfigurationOutput === output) nbrConfigurations++

    goToNextConfigurations(dices, diceMaxValue)
  }

  return nbrConfigurations
}