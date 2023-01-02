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
function CleanerFinal() {
    const { config } = (0, _hooks_1.useConfig)();
    (0, clog_1.clogWorking)(_enums_1.Tasks.cleanerFinal);
    fs_1.default.existsSync(path_1.default.join(config.outDir, './__compiled')) && fs_1.default.rmSync(path_1.default.join(config.outDir, './__compiled'), { recursive: true, force: true });
    fs_1.default.existsSync(path_1.default.join(config.outDir, './__templates')) && fs_1.default.rmSync(path_1.default.join(config.outDir, './__templates'), { recursive: true, force: true });
}
exports.default = CleanerFinal;
