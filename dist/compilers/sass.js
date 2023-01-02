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
exports.compileStyles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sass_1 = require("sass");
const _enums_1 = require("../typing/enums.js");
const glob_1 = require("../lib/glob");
const _hooks_1 = require("../hooks/index.js");
function compileFiles(files) {
    const { config } = (0, _hooks_1.useConfig)();
    const { setError } = (0, _hooks_1.useError)();
    const { mode } = (0, _hooks_1.useMode)();
    try {
        files.forEach(file => {
            const result = (0, sass_1.compile)(file, {
                style: 'expanded',
                sourceMap: true,
                sourceMapIncludeSources: true,
                functions: {
                    'get_static_init()': function () {
                        let url = mode === _enums_1.Mode.dev
                            ? `/`
                            : `../`;
                        return new sass_1.SassString(url);
                    },
                    'get_hex_decimal($number)': function (args) {
                        let numberInput = args[0].assertNumber('number').assertNoUnits('number');
                        let number = numberInput.value;
                        let hex = number.toString(16);
                        return new sass_1.SassString(hex);
                    }
                }
            });
            let filename = path_1.default.basename(file).replace('.scss', '.css');
            let pathResult = `./__compiled/${filename}`;
            let pathResultMapping = `./__compiled/${filename}.map`;
            if (_enums_1.Mode.dev === mode) {
                fs_1.default.writeFileSync(path_1.default.join(config.tmpDir, pathResult), `${result.css}\n/*# sourceMappingURL=${filename}.map */`);
                fs_1.default.writeFileSync(path_1.default.join(config.tmpDir, pathResultMapping), JSON.stringify(result.sourceMap));
            }
            if (_enums_1.Mode.build === mode) {
                fs_1.default.writeFileSync(path_1.default.join(config.outDir, pathResult), result.css);
            }
        });
        return true;
    }
    catch (error) {
        setError(error.message, _enums_1.Tasks.styles);
        return false;
    }
}
function compileStyles() {
    return __awaiter(this, void 0, void 0, function* () {
        const { clearError } = (0, _hooks_1.useError)();
        let files = yield (0, glob_1.getFiles)('./src/theme/styles/*.scss');
        let isCompileSass = compileFiles(files);
        if (isCompileSass)
            clearError(_enums_1.Tasks.styles);
    });
}
exports.compileStyles = compileStyles;
