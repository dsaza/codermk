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
exports.applyPostcss = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const postcss_1 = __importDefault(require("postcss"));
const cssnano_1 = __importDefault(require("cssnano"));
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const _hooks_1 = require("../hooks/index.js");
const glob_1 = require("../lib/glob");
function applyPostcss() {
    return __awaiter(this, void 0, void 0, function* () {
        const { config } = (0, _hooks_1.useConfig)();
        const files = yield (0, glob_1.getFiles)(`./${config.buildPath}/__compiled/*.css`);
        const plugins = [
            (0, autoprefixer_1.default)({
                overrideBrowserslist: [
                    '>0.2%',
                    'not dead',
                    'not op_mini all'
                ]
            }),
            cssnano_1.default
        ];
        for (const file of files) {
            let filename = path_1.default.basename(file).replace('.css', '');
            let content = fs_1.default.readFileSync(file, 'utf8');
            let resolve = yield (0, postcss_1.default)(plugins).process(content, {
                from: file,
                to: path_1.default.join(config.outDir, `./assets/css/${filename}-codermk.min.css`)
            });
            fs_1.default.writeFileSync(path_1.default.join(config.outDir, `./assets/css/${filename}-codermk.min.css`), `${resolve.css}`);
        }
    });
}
exports.applyPostcss = applyPostcss;
