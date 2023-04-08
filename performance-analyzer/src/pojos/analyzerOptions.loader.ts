import jsonFile from "../../options.analyzer.json"

export class AnalyzerOptionsLoader {
    public static load(): IAnalyzerOptions {

        const options: IAnalyzerOptions = {
            numberOfFacePerDice: jsonFile.options.numberOfFacePerDice,
            testsToRun: jsonFile.options.testsToRun.map((test) => ({ iterations: jsonFile.options.baseNumberOfIterations || 1, ...test, }))
        }

        options.numberOfFacePerDice = options.numberOfFacePerDice || 6

        for (const test of options.testsToRun) {
            test.total = test.total || 1
            test.numberOfDices = test.numberOfDices || 1
        }

        return options
    }
}