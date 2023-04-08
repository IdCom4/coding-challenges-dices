export {}

declare global {

    interface ITestOptions {
        total: number,
        numberOfDices: number,
        iterations: number
    }

    interface IAnalyzerOptions {
        numberOfFacePerDice: number,
        testsToRun: ITestOptions[]
    }
}

