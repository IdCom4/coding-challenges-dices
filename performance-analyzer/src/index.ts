import { AnalyzerOptionsLoader } from "./pojos/analyzerOptions.loader";
import { versions } from "../..";
import fs from 'fs'

const options: IAnalyzerOptions = AnalyzerOptionsLoader.load()
const resultsData: IAnalyzeData = { tests: [] }

const typedVersions = versions as Record<string, TVersionFunction>

for (let testIndex = 0; testIndex < options.testsToRun.length; testIndex++) {
    const test = options.testsToRun[testIndex]

    const testData: ITestData = {
        ...test,
        results: []
    }

    for (const versionNumber in versions) {
        const version = typedVersions[versionNumber]
        const averageExecutionTime: [number, number] = [0, 0]

        for (let iteration = 0; iteration < test.iterations; iteration++) {
            // store start time
            const startTime = process.hrtime()

            version(test.total, test.numberOfDices, options.numberOfFacePerDice)

            // get the execution time
            const executionTime = process.hrtime(startTime)
            averageExecutionTime[0] += executionTime[0]
            averageExecutionTime[1] += executionTime[1]
        }

        const averageSeconds = averageExecutionTime[0] / test.iterations
        const averageMilliseconds = Number.parseFloat((averageExecutionTime[1] / test.iterations / 1000000000).toFixed(7))

        testData.results.push({ versionName: versionNumber, averageExecutionTime: averageSeconds + averageMilliseconds })

    }
    resultsData.tests.push(testData)
}

for (let i = 0; i < resultsData.tests.length; i++) {
    const test = resultsData.tests[i]

    console.log(`=== TEST N°${i} ===`)
    console.log(`numberOfDices: ${test.numberOfDices}`)
    console.log(`total: ${test.total}`)
    console.log(test.results)
}



// store results to file
fs.writeFile("./performance-analyzer/results.analyzer.js", 'const data = ' + JSON.stringify(resultsData), (error) => { if (error) console.log('[ERROR] ', error) });