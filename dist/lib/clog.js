"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clogDefault = exports.clogWorking = exports.clogHead = void 0;
const chalk_1 = __importDefault(require("chalk"));
const _enums_1 = require("../typing/enums.js");
const _hooks_1 = require("../hooks/index.js");
const helpers_1 = require("./helpers");
function getError() {
    const { ctxErrors } = (0, _hooks_1.useError)();
    let error = {
        status: false,
        message: ''
    };
    if (ctxErrors.scripts.status) {
        error.status = ctxErrors.scripts.status;
        error.message = ctxErrors.scripts.message;
        return error;
    }
    if (ctxErrors.views.status) {
        error.status = ctxErrors.views.status;
        error.message = ctxErrors.views.message;
        return error;
    }
    if (ctxErrors.styles.status) {
        error.status = ctxErrors.styles.status;
        error.message = ctxErrors.styles.message;
        return error;
    }
    return error;
}
function clogHead() {
    const { mode } = (0, _hooks_1.useMode)();
    let message = _enums_1.Mode.dev === mode ? 'Starting up your environment' : 'Building the web layout';
    resetConsole();
    console.log(chalk_1.default.bold.blueBright('[C/] CODERMK') + '      🤖 ' + chalk_1.default.gray(message) + '\n');
}
exports.clogHead = clogHead;
function clogWorking(task) {
    console.log(chalk_1.default.gray((0, helpers_1.getTime)()) + ' Working on... ' + getWorkingMessage(task));
}
exports.clogWorking = clogWorking;
function clogDefault(task) {
    const { config } = (0, _hooks_1.useConfig)();
    const error = getError();
    resetConsole();
    if (!error.status) {
        let message = task === _enums_1.Tasks.server ? 'We are ready' : 'Everything is going great';
        let icon = task === _enums_1.Tasks.server ? '⭐' : '✅';
        console.log(chalk_1.default.bold.blueBright('[C/] CODERMK') + `      ${icon} ` + chalk_1.default.gray(message));
        console.log(chalk_1.default.bold.white('\nYour development server: ') + chalk_1.default.cyan(`http://localhost:${config.port}`));
        task === _enums_1.Tasks.server
            ? console.log('\n' + chalk_1.default.gray((0, helpers_1.getTime)()) + ' The development server is ready to listen to your changes')
            : console.log('\n' + chalk_1.default.gray((0, helpers_1.getTime)()) + ' The last changes were from... ' + getWorkingMessage(task));
    }
    else {
        console.log(chalk_1.default.bold.blueBright('[C/] CODERMK') + '      ❌ ' + chalk_1.default.gray('Have something to correct'));
        console.log(chalk_1.default.bold.red('\nAn error has occurred\n'));
        console.log(chalk_1.default.red(error.message));
    }
    console.log('');
}
exports.clogDefault = clogDefault;
function resetConsole() {
    process.stdout.write('\x1Bc');
    console.log('');
}
function getWorkingMessage(task) {
    let messages = {
        [_enums_1.Tasks.cleaner]: chalk_1.default.white('Clean environment space'),
        [_enums_1.Tasks.cleanerFinal]: chalk_1.default.white('Clean final build'),
        [_enums_1.Tasks.views]: chalk_1.default.green('Twig templates'),
        [_enums_1.Tasks.viewsPretty]: chalk_1.default.green('Twig to HTML beautiful'),
        [_enums_1.Tasks.scripts]: chalk_1.default.yellow('Javascript files'),
        [_enums_1.Tasks.scriptsMinify]: chalk_1.default.yellow('Minify javascript files'),
        [_enums_1.Tasks.styles]: chalk_1.default.magenta('Sass (scss) files'),
        [_enums_1.Tasks.stylesFull]: chalk_1.default.magenta('Post processing css'),
        [_enums_1.Tasks.server]: chalk_1.default.blue('Setting up development server'),
        [_enums_1.Tasks.assets]: chalk_1.default.blue('Copy assets'),
    };
    return messages.hasOwnProperty(task) ? messages[task] : '';
}
