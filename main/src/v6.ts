const memoizedData = new Map<string, number>()

function getTotalPossibleConfigurationsRecurive(total: number, numberOfDices: number, numberOfFace: number): number {

  if (total < numberOfDices || total > numberOfDices * numberOfFace) return 0
  
  if (numberOfDices === 1) return 1

  const formattedKey = total + "_" + numberOfDices
  const storedData = memoizedData.get(formattedKey)

  if (storedData) return storedData

  let nbrConfigurations = 0
  for (let diceValue = 1; diceValue <= numberOfFace && diceValue < total; diceValue++) {
    nbrConfigurations += getTotalPossibleConfigurationsRecurive(total - diceValue, numberOfDices - 1, numberOfFace)
  }

  memoizedData.set(formattedKey, nbrConfigurations)

  return nbrConfigurations
}

export default function getTotalPossibleConfigurations(total: number, numberOfDices: number, numberOfFace = 6): number {
  const invalidInputs = numberOfDices < 1 || total < 1
  const impossibleDices = numberOfFace < 1
  const tooMuchDices = total < numberOfDices
  const notEnoughDices = total > numberOfDices * numberOfFace

  if (invalidInputs || impossibleDices || tooMuchDices || notEnoughDices) return 0

  return getTotalPossibleConfigurationsRecurive(total, numberOfDices, numberOfFace)
}