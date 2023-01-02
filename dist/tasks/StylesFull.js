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
const _enums_1 = require("../typing/enums.js");
const clog_1 = require("../lib/clog");
const postcss_1 = require("../compilers/postcss");
const _hooks_1 = require("../hooks/index.js");
function StylesFull() {
    return __awaiter(this, void 0, void 0, function* () {
        const { mode } = (0, _hooks_1.useMode)();
        (0, clog_1.clogWorking)(_enums_1.Tasks.stylesFull);
        if (mode === _enums_1.Mode.build) {
            yield (0, postcss_1.applyPostcss)();
        }
    });
}
exports.default = StylesFull;
