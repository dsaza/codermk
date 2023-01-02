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
exports.prettyHTML = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pretty_1 = __importDefault(require("pretty"));
const glob_1 = require("../lib/glob");
const _hooks_1 = require("../hooks/index.js");
function prettyHTML() {
    return __awaiter(this, void 0, void 0, function* () {
        const { config } = (0, _hooks_1.useConfig)();
        const files = yield (0, glob_1.getFiles)(`./${config.buildPath}/__templates/*.html`);
        files.forEach(file => {
            let content = fs_1.default.readFileSync(file, 'utf8');
            let resolve = (0, pretty_1.default)(content, { ocd: true });
            let filename = path_1.default.basename(file);
            fs_1.default.writeFileSync(path_1.default.join(config.outDir, `./${filename}`), resolve);
        });
    });
}
exports.prettyHTML = prettyHTML;
