"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDir = void 0;
const _hooks_1 = require("../hooks/index.js");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
function copyDir() {
    const { config } = (0, _hooks_1.useConfig)();
    let source = path_1.default.join(config.rootDir, './static');
    let destination = path_1.default.join(config.outDir, './assets');
    return new Promise(resolve => {
        fs_extra_1.default.copy(source, destination, function (err) {
            if (err) {
                resolve();
                return;
            }
            resolve();
        });
    });
}
exports.copyDir = copyDir;
