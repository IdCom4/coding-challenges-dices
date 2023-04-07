function getCurrentConfigurationOutput(dices: number[]) {
  return dices.reduce((currentTotal, nextValue) => currentTotal + nextValue, 0)
}

function goToNextDiceNextConfiguration(dices: number[], numberOfFace: number) {
  let offsetIndex = 1
  let wantedIndex = dices.length - offsetIndex

  dices[wantedIndex] = 1
  wantedIndex--

  // console.log('checking !')
  while (wantedIndex >= 0) {
    if (dices[wantedIndex] < numberOfFace) {
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

function jumpToNextValidHigherConfiguration(dices: number[], numberOfFace: number, diffToJump: number) {
  let offsetIndex = 1
  let wantedIndex = dices.length - offsetIndex

  // console.log("====\nin jumpToHigher")
  while (wantedIndex >= 0) {
    
    if (!wantedIndex && dices[wantedIndex] + diffToJump > numberOfFace) return false

    if (dices[wantedIndex] + diffToJump <= numberOfFace) {
      dices[wantedIndex] += diffToJump
      return true
    }

    diffToJump -= numberOfFace - dices[wantedIndex]
    dices[wantedIndex] = numberOfFace

    wantedIndex--
  }

  return false
}

function jumpToNextLowerEnoughConfiguration(dices: number[], numberOfFace: number, wantedTotal: number) {
  let offsetIndex = 1
  let wantedIndex = dices.length - offsetIndex

  let currentConfigurationOutput = getCurrentConfigurationOutput(dices)

  while (currentConfigurationOutput > wantedTotal) {
    if (!wantedIndex) return false

    currentConfigurationOutput -= dices[wantedIndex] - 1
    dices[wantedIndex] = 1

    for (let i = 1; i <= wantedIndex; i++) {
      dices[wantedIndex - i] += 1
      currentConfigurationOutput++
      if (dices[wantedIndex - i] <= numberOfFace) break
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

export default function getTotalPossibleConfigurations(total: number, numberOfDices: number, numberOfFace = 6): number {
  const invalidInputs = numberOfDices < 1 || total < 1
  const impossibleDices = numberOfFace < 1
  const tooMuchDices = total < numberOfDices
  const notEnoughDices = total > numberOfDices * numberOfFace

  if (invalidInputs || impossibleDices || tooMuchDices || notEnoughDices) return 0

  const dices: number[] = new Array<number>(numberOfDices).fill(1)

  let nbrConfigurations = 0
  let currentConfigurationOutput = numberOfDices

  while (currentConfigurationOutput < numberOfDices * numberOfFace) {
    
    currentConfigurationOutput = getCurrentConfigurationOutput(dices)

    if (currentConfigurationOutput === total) {
      nbrConfigurations++
      if (!goToNextDiceNextConfiguration(dices, numberOfFace)) break
    }
    else {
      if (currentConfigurationOutput < total) {
        if (!jumpToNextValidHigherConfiguration(dices, numberOfFace, total - currentConfigurationOutput)) break
      }
      else {
        if (!jumpToNextLowerEnoughConfiguration(dices, numberOfFace, total)) break
      }
    }
  }

  return nbrConfigurations
}