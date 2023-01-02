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
exports.compileScripts = void 0;
const path_1 = __importDefault(require("path"));
const esbuild_1 = __importDefault(require("esbuild"));
const _enums_1 = require("../typing/enums.js");
const glob_1 = require("../lib/glob");
const helpers_1 = require("../lib/helpers");
const _hooks_1 = require("../hooks/index.js");
function transfromScripts(files, data) {
    const { config } = (0, _hooks_1.useConfig)();
    const { setError } = (0, _hooks_1.useError)();
    const { mode } = (0, _hooks_1.useMode)();
    let dataJson = (0, helpers_1.arrayJsonFilesToObject)(data);
    let outDir = _enums_1.Mode.build === mode ? path_1.default.join(config.outDir, './__compiled') : path_1.default.join(config.tmpDir, './__compiled');
    try {
        esbuild_1.default.buildSync({
            bundle: true,
            entryPoints: files,
            minify: false,
            outdir: outDir,
            sourcemap: mode === _enums_1.Mode.dev,
            target: ['es2020', 'chrome58', 'firefox57', 'safari11'],
            define: {
                __mkdata: JSON.stringify(dataJson)
            }
        });
        return true;
    }
    catch (error) {
        setError(error.message, _enums_1.Tasks.scripts);
        return false;
    }
}
function compileScripts() {
    return __awaiter(this, void 0, void 0, function* () {
        const { clearError } = (0, _hooks_1.useError)();
        const { getDataJson } = (0, _hooks_1.useJson)();
        let files = yield (0, glob_1.getFiles)('./src/application/modules/*.js');
        let data = yield getDataJson();
        let isTransformScript = transfromScripts(files, data);
        if (isTransformScript)
            clearError(_enums_1.Tasks.scripts);
    });
}
exports.compileScripts = compileScripts;
