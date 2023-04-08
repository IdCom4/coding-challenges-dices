export {}

declare global {

    type TSeconds = number

    interface IVersionResult {
        versionName: string
        averageExecutionTime: TSeconds
    }

    interface ITestData extends Omit<ITestOptions, 'iterations'> {
        results: IVersionResult[]
    }

    interface IAnalyzeData {
        tests: ITestData[]
    }
}