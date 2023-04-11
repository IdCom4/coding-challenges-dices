const memoizedData: Array<Array<number>> = []

function getTotalPossibleConfigurationsRecurive(total: number, numberOfDices: number, numberOfFace: number): number {

  if (total < numberOfDices || total > numberOfDices * numberOfFace) return 0
  
  if (numberOfDices === 1) return 1

  const data = memoizedData[total][numberOfDices]

  if (data) return data

  let nbrConfigurations = 0
  const subDices = numberOfDices - 1

  for (let diceValue = 1; diceValue <= numberOfFace && diceValue < total; diceValue++)
    nbrConfigurations += getTotalPossibleConfigurationsRecurive(total - diceValue, subDices, numberOfFace)

  memoizedData[total][numberOfDices] = nbrConfigurations

  return nbrConfigurations
}

export default function getTotalPossibleConfigurations(total: number, numberOfDices: number, numberOfFace = 6): number {
  const invalidInputs = numberOfDices < 1 || total < 1
  const impossibleDices = numberOfFace < 1
  const tooMuchDices = total < numberOfDices
  const notEnoughDices = total > numberOfDices * numberOfFace

  if (invalidInputs || impossibleDices || tooMuchDices || notEnoughDices) return 0

  for (let i = 1; i <= total; i++)
    memoizedData[i] = new Array(numberOfDices)

  return getTotalPossibleConfigurationsRecurive(total, numberOfDices, numberOfFace)
}