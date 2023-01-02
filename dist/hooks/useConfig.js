"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
let config = {
    tmpDir: '',
    rootDir: path_1.default.resolve(process.cwd()),
    buildPath: './build',
    outDir: '',
    bustcacheEnabled: false,
    port: 5000,
};
function setInputConfig(inConfig) {
    config = Object.assign(Object.assign({}, config), inConfig);
    config.outDir = path_1.default.join(process.cwd(), config.buildPath);
    config.tmpDir = path_1.default.join(config.rootDir, './.codermk');
}
function useConfig() {
    return {
        config,
        setInputConfig
    };
}
exports.default = useConfig;
