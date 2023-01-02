"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchFiles = exports.getFiles = void 0;
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const glob_watcher_1 = __importDefault(require("glob-watcher"));
const _enums_1 = require("../typing/enums.js");
const helpers_1 = require("./helpers");
const _hooks_1 = require("../hooks/index.js");
function getFiles(pattern, initPath = _enums_1.Dirp.root) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config } = (0, _hooks_1.useConfig)();
        let pathFiles = config.rootDir;
        if (initPath === _enums_1.Dirp.tmp)
            pathFiles = config.tmpDir;
        return new Promise(resolve => {
            (0, glob_1.default)((0, helpers_1.rdir)(path_1.default.join(pathFiles, pattern)), (err, files) => {
                if (err)
                    resolve([]);
                resolve(files);
            });
        });
    });
}
exports.getFiles = getFiles;
function watchFiles(patterns, callback) {
    const { config } = (0, _hooks_1.useConfig)();
    let patternsJoin = patterns.map(pattern => (0, helpers_1.rdir)(path_1.default.join(config.rootDir, pattern)));
    (0, glob_watcher_1.default)(patternsJoin, done => {
        callback(done);
    });
}
exports.watchFiles = watchFiles;
