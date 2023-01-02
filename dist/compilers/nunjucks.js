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
exports.renderTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const nunjucks_globals_1 = require("./nunjucks-globals");
const _enums_1 = require("../typing/enums.js");
const helpers_1 = require("../lib/helpers");
const glob_1 = require("../lib/glob");
const _hooks_1 = require("../hooks/index.js");
const envTemplate = nunjucks_1.default.configure({
    noCache: true,
    autoescape: true
});
function removePrevTemplates(prevFiles) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config } = (0, _hooks_1.useConfig)();
        let entryFiles = prevFiles.map(file => {
            let extname = path_1.default.basename(file).replace('.twig', '.html');
            return (0, helpers_1.rdir)(path_1.default.join(config.tmpDir, `./${extname}`));
        });
        let currentFiles = yield (0, glob_1.getFiles)('./*.html', _enums_1.Dirp.tmp);
        currentFiles.forEach(file => !entryFiles.includes(file) && fs_1.default.rmSync(file, { recursive: true, force: true }));
    });
}
function setGlobals(data) {
    let globals = (0, nunjucks_globals_1.getEnvGlobals)(data);
    Object.keys(globals).forEach(key => {
        envTemplate.addGlobal(key, globals[key]);
    });
}
function renderFile(file) {
    const { setError } = (0, _hooks_1.useError)();
    const { config } = (0, _hooks_1.useConfig)();
    const { mode } = (0, _hooks_1.useMode)();
    return new Promise(resolve => {
        nunjucks_1.default.render(file, (error, res) => {
            let filename;
            if (error) {
                setError(error.message, _enums_1.Tasks.views);
                resolve(false);
                return;
            }
            filename = path_1.default.basename(file).replace('.twig', '.html');
            if (_enums_1.Mode.dev === mode)
                fs_1.default.writeFileSync(path_1.default.join(config.tmpDir, `./${filename}`), res);
            if (_enums_1.Mode.build === mode)
                fs_1.default.writeFileSync(path_1.default.join(config.outDir, `./__templates/${filename}`), res);
            resolve(true);
        });
    });
}
function runRender(files) {
    return __awaiter(this, void 0, void 0, function* () {
        let errors = 0;
        for (const file of files) {
            let isRenderFile = yield renderFile(file);
            if (!isRenderFile)
                errors++;
        }
        return errors < 1;
    });
}
function renderTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        const { clearError } = (0, _hooks_1.useError)();
        const { getDataJson } = (0, _hooks_1.useJson)();
        const files = yield (0, glob_1.getFiles)('./src/views/pages/**/*.twig');
        const data = yield getDataJson();
        let renderTemplateFiles;
        yield removePrevTemplates(files);
        setGlobals(data);
        renderTemplateFiles = yield runRender(files);
        if (renderTemplateFiles)
            clearError(_enums_1.Tasks.views);
    });
}
exports.renderTemplate = renderTemplate;
