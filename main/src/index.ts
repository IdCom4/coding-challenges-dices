import v1 from "./v1"
import v2 from "./v2"
import v3 from "./v3"
import v4 from "./v4"
import v5 from "./v5"
import v6 from "./v6"
import v7 from "./v7"

if (process.argv.length < 4) {
  console.log('[ERROR] usage: <exec> [output] [diceAmount] ([maxDiceValue])')
  process.exit(1)
}

let output: number
let diceAmount: number
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
  v3,
  v4,
  v5,
  v6,
  v7
]

function testVersion(version: (output: number, diceAmount: number, maxDiceValue: number) => number, versionName: string) {
  const hrstart = process.hrtime()
  const amount = version(output, diceAmount, maxDiceValue)
  const hrend = process.hrtime(hrstart)
  console.log(`[${versionName}] number of possible configurations for a total output of [${output}] with [${diceAmount}] D${maxDiceValue}: ${amount} (${hrend[0]}s ${hrend[1] / 1000000}ms)`)
}

// for(let index = 0; index < versions.length; index++) { // -> slowest to fastest
for(let index = versions.length - 1; index >= 0; index--) { // -> fastest to slowest
  const version = versions[index]
  testVersion(version, `V${index + 1}`)
}
