import { getDicesNumberOfConfigurationsForOutput as v1 } from "./v1"
import { getDicesNumberOfConfigurationsForOutput as v2 } from "./v2"
import { getDicesNumberOfConfigurationsForOutput as v3 } from "./v3"

if (process.argv.length < 4) {
  console.log('[ERROR] usage: <exec> [output] [diceAmount] ([maxDiceValue])')
  process.exit(1)
}

let output
let diceAmount
let maxDiceValue = 6

try {
  output = parseInt(process.argv[2])
  diceAmount = parseInt(process.argv[3])
  if (process.argv.length >= 5)
    maxDiceValue = parseInt(process.argv[4]) 
} catch (e) {
  console.log('[ERROR] parameters must be int values')
  process.exit(1)
}

const versions = [
  v1,
  v2,
  v3
]

for(let index = 0; index < versions.length; index++) {
  const hrstart = process.hrtime()
  const amount = versions[index](output, diceAmount, maxDiceValue)
  const hrend = process.hrtime(hrstart)
  console.log(`[V${index + 1}] number of possible configurations for a total output of [${output}] with [${diceAmount}] D${maxDiceValue}: ${amount} (${hrend[0]}s ${hrend[1] / 1000000}ms)`)
}