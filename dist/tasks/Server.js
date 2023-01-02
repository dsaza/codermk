"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const browser_sync_1 = __importDefault(require("browser-sync"));
const _enums_1 = require("../typing/enums.js");
const clog_1 = require("../lib/clog");
const _hooks_1 = require("../hooks/index.js");
function Server() {
    const { config } = (0, _hooks_1.useConfig)();
    const bs = browser_sync_1.default.create();
    (0, clog_1.clogWorking)(_enums_1.Tasks.server);
    bs.init({
        server: [path_1.default.join(config.rootDir, './static'), config.tmpDir],
        logLevel: 'silent',
        notify: false,
        watch: true,
        open: false,
        port: config.port
    });
    (0, clog_1.clogDefault)(_enums_1.Tasks.server);
}
exports.default = Server;
