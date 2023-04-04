import { PROBABILITY } from "./common"

function getCurrentConfigurationOutput(dices: number[]) {
  return dices.reduce((currentTotal, nextValue) => currentTotal + nextValue, 0)
}

function goToNextConfiguration(dices: number[], diceMaxValue: number) {
  let offsetIndex = 1
  let wantedIndex = dices.length - offsetIndex

  while (wantedIndex >= 0) {
    if (dices[wantedIndex] < diceMaxValue) {
      dices[wantedIndex]++
      return true
    }
    else if (wantedIndex === 0) return false
 
    dices[wantedIndex] = 1
    wantedIndex--
  }

  console.log({dices})
  return false
}

function goToNextDiceNextConfiguration(dices: number[], diceMaxValue: number) {
  let offsetIndex = 1
  let wantedIndex = dices.length - offsetIndex

  dices[wantedIndex] = 1
  wantedIndex--

  while (wantedIndex >= 0) {
    if (dices[wantedIndex] < diceMaxValue) {
      dices[wantedIndex]++
      return true
    }
    else if (wantedIndex === 0) return false
 
    dices[wantedIndex] = 1
    wantedIndex--
  }

  console.log({ nextDices: dices })
  return false
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
    
    if (currentConfigurationOutput > output) {
      if (!goToNextDiceNextConfiguration(dices, diceMaxValue)) break
    } else {
      if (!goToNextConfiguration(dices, diceMaxValue)) break
    }
  }

  return nbrConfigurations
}