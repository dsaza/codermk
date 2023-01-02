"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _enums_1 = require("../typing/enums.js");
let mode = _enums_1.Mode.dev;
function useMode() {
    return {
        mode,
        setMode: (modeApp) => {
            mode = modeApp;
        }
    };
}
exports.default = useMode;
