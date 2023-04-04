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

  // console.log('checking !')
  while (wantedIndex >= 0) {
    if (dices[wantedIndex] < diceMaxValue) {
      dices[wantedIndex]++
      return true
    }
    else if (wantedIndex === 0) return false
 
    dices[wantedIndex] = 1
    wantedIndex--

    // console.log('wantedIndex: ', wantedIndex)
  }

  console.log({ nextDices: dices })
  return false
}

/* function jumpToNextValidConfiguration(dices: number[], diceMaxValue: number, diffToJump: number) {
  let offsetIndex = 1
  let wantedIndex = dices.length - offsetIndex

  console.log("====")
  console.log({ dices })
  console.log("diff: ", diffToJump)
  while (wantedIndex >= 0) {
    
    if (!wantedIndex && dices[wantedIndex] + diffToJump > diceMaxValue) return false

    const totalFlow = dices[wantedIndex] + diffToJump
    dices[wantedIndex] = (totalFlow % diceMaxValue) || diceMaxValue
    diffToJump = Math.floor(totalFlow / diceMaxValue)

    console.log({ dices })
    if (diffToJump === 0) return true

    wantedIndex--
  }

  return false
} */

function jumpToNextValidHigherConfiguration(dices: number[], diceMaxValue: number, diffToJump: number) {
  let offsetIndex = 1
  let wantedIndex = dices.length - offsetIndex

  // console.log("====\nin jumpToHigher")
  while (wantedIndex >= 0) {
    
    if (!wantedIndex && dices[wantedIndex] + diffToJump > diceMaxValue) return false

    if (dices[wantedIndex] + diffToJump <= diceMaxValue) {
      dices[wantedIndex] += diffToJump
      return true
    }

    diffToJump -= diceMaxValue - dices[wantedIndex]
    dices[wantedIndex] = diceMaxValue

    wantedIndex--
  }

  return false
}

function jumpToNextLowerEnoughConfiguration(dices: number[], diceMaxValue: number, wantedTotal: number) {
  let offsetIndex = 1
  let wantedIndex = dices.length - offsetIndex

  let currentConfigurationOutput = getCurrentConfigurationOutput(dices)

  // console.log("====\nin jumpToLower")
  // console.log("input dices: ", dices)
  // need to lower the total
  // then jump to next valid higher
  while (currentConfigurationOutput > wantedTotal) {
    if (!wantedIndex) return false

    currentConfigurationOutput -= dices[wantedIndex] - 1
    dices[wantedIndex] = 1

    for (let i = 1; i <= wantedIndex; i++) {
      dices[wantedIndex - i] += 1
      currentConfigurationOutput++
      if (dices[wantedIndex - i] <= diceMaxValue) break
      else if (!(wantedIndex - i)) return false
      else {
        currentConfigurationOutput -= dices[wantedIndex - i] - 1
        dices[wantedIndex - i] = 1
      }
    }

    wantedIndex--
  }
  return true
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

    if (currentConfigurationOutput === output) {
      nbrConfigurations++
      if (!goToNextDiceNextConfiguration(dices, diceMaxValue)) break
    }
    else {
      if (currentConfigurationOutput < output) {
        if (!jumpToNextValidHigherConfiguration(dices, diceMaxValue, output - currentConfigurationOutput)) break
      }
      else {
        if (!jumpToNextLowerEnoughConfiguration(dices, diceMaxValue, output)) break
      }
    }
    /* 
    if (currentConfigurationOutput > output) {
      if (!goToNextDiceNextConfiguration(dices, diceMaxValue)) break
    } else {
      if (!goToNextConfiguration(dices, diceMaxValue)) break
    } */
  }

  return nbrConfigurations
}