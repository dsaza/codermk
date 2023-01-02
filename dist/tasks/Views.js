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
Object.defineProperty(exports, "__esModule", { value: true });
const nunjucks_1 = require("../compilers/nunjucks");
const _enums_1 = require("../typing/enums.js");
const glob_1 = require("../lib/glob");
const clog_1 = require("../lib/clog");
const _hooks_1 = require("../hooks/index.js");
function Views() {
    return __awaiter(this, void 0, void 0, function* () {
        const { mode } = (0, _hooks_1.useMode)();
        const watchesFiles = ['./src/views/**/*.twig', './data/*.json'];
        (0, clog_1.clogWorking)(_enums_1.Tasks.views);
        yield (0, nunjucks_1.renderTemplate)();
        if (mode === _enums_1.Mode.dev) {
            (0, glob_1.watchFiles)(watchesFiles, (done) => __awaiter(this, void 0, void 0, function* () {
                yield (0, nunjucks_1.renderTemplate)();
                (0, clog_1.clogDefault)(_enums_1.Tasks.views);
                done();
            }));
        }
    });
}
exports.default = Views;
