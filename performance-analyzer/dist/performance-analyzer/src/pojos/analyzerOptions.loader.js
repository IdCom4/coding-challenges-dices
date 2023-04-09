"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzerOptionsLoader = void 0;
const options_analyzer_json_1 = __importDefault(require("../../options.analyzer.json"));
class AnalyzerOptionsLoader {
    static load() {
        const options = {
            numberOfFacePerDice: options_analyzer_json_1.default.options.numberOfFacePerDice,
            testsToRun: options_analyzer_json_1.default.options.testsToRun.map((test) => (Object.assign({ iterations: options_analyzer_json_1.default.options.baseNumberOfIterations || 1 }, test)))
        };
        options.numberOfFacePerDice = options.numberOfFacePerDice || 6;
        for (const test of options.testsToRun) {
            test.total = test.total || 1;
            test.numberOfDices = test.numberOfDices || 1;
        }
        return options;
    }
}
exports.AnalyzerOptionsLoader = AnalyzerOptionsLoader;
