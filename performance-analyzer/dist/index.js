"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.versions = void 0;
__exportStar(require("./main/src/v5"), exports);
const v1_1 = __importDefault(require("./main/src/v1"));
const v2_1 = __importDefault(require("./main/src/v2"));
const v3_1 = __importDefault(require("./main/src/v3"));
const v4_1 = __importDefault(require("./main/src/v4"));
const v5_1 = __importDefault(require("./main/src/v5"));
exports.versions = { v1: v1_1.default, v2: v2_1.default, v3: v3_1.default, v4: v4_1.default, v5: v5_1.default };
