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
exports.bootstrap = void 0;
const _enums_1 = require("./typing/enums.js");
const runner_1 = require("./lib/runner");
const clog_1 = require("./lib/clog");
const _hooks_1 = require("./hooks/index.js");
const Cleaner_1 = __importDefault(require("./tasks/Cleaner"));
const Views_1 = __importDefault(require("./tasks/Views"));
const Scripts_1 = __importDefault(require("./tasks/Scripts"));
const Styles_1 = __importDefault(require("./tasks/Styles"));
const Server_1 = __importDefault(require("./tasks/Server"));
const ViewsPretty_1 = __importDefault(require("./tasks/ViewsPretty"));
const ScriptsMinify_1 = __importDefault(require("./tasks/ScriptsMinify"));
const StylesFull_1 = __importDefault(require("./tasks/StylesFull"));
const Assets_1 = __importDefault(require("./tasks/Assets"));
const CleanerFinal_1 = __importDefault(require("./tasks/CleanerFinal"));
function bootstrap(mode, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { setMode } = (0, _hooks_1.useMode)();
        const { setInputConfig } = (0, _hooks_1.useConfig)();
        setMode(mode);
        setInputConfig(config);
        (0, clog_1.clogHead)();
        if (mode === _enums_1.Mode.dev) {
            (0, runner_1.series)(Cleaner_1.default);
            yield (0, runner_1.parallel)(Views_1.default, Scripts_1.default, Styles_1.default);
            (0, runner_1.series)(Server_1.default);
        }
        if (mode === _enums_1.Mode.build) {
            (0, runner_1.series)(Cleaner_1.default);
            yield (0, runner_1.parallel)(Views_1.default);
            yield (0, runner_1.parallel)(Scripts_1.default);
            yield (0, runner_1.parallel)(Styles_1.default);
            yield (0, runner_1.parallel)(ViewsPretty_1.default);
            yield (0, runner_1.parallel)(ScriptsMinify_1.default);
            yield (0, runner_1.parallel)(StylesFull_1.default);
            yield (0, runner_1.parallel)(Assets_1.default);
            (0, runner_1.series)(CleanerFinal_1.default);
        }
    });
}
exports.bootstrap = bootstrap;
