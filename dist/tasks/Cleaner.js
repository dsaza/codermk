"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const _enums_1 = require("../typing/enums.js");
const clog_1 = require("../lib/clog");
const _hooks_1 = require("../hooks/index.js");
function Cleaner() {
    const { config } = (0, _hooks_1.useConfig)();
    const { mode } = (0, _hooks_1.useMode)();
    const resetFolder = (path) => {
        fs_1.default.existsSync(path) && fs_1.default.rmSync(path, { recursive: true, force: true });
        fs_1.default.mkdirSync(path);
    };
    (0, clog_1.clogWorking)(_enums_1.Tasks.cleaner);
    if (mode === _enums_1.Mode.dev) {
        resetFolder(config.tmpDir);
        fs_1.default.mkdirSync(path_1.default.join(config.tmpDir, './__compiled'));
    }
    if (mode === _enums_1.Mode.build) {
        resetFolder(config.outDir);
        fs_1.default.existsSync(config.tmpDir) && fs_1.default.rmSync(config.tmpDir, { recursive: true, force: true });
        fs_1.default.mkdirSync(path_1.default.join(config.outDir, './assets'));
        fs_1.default.mkdirSync(path_1.default.join(config.outDir, './assets/css'));
        fs_1.default.mkdirSync(path_1.default.join(config.outDir, './assets/js'));
        fs_1.default.mkdirSync(path_1.default.join(config.outDir, './__compiled'));
        fs_1.default.mkdirSync(path_1.default.join(config.outDir, './__templates'));
    }
}
exports.default = Cleaner;
