"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _enums_1 = require("../typing/enums.js");
let ctxErrors = {
    views: {
        status: false,
        message: '',
    },
    scripts: {
        status: false,
        message: '',
    },
    styles: {
        status: false,
        message: '',
    },
};
function useError() {
    const setError = (message, type) => {
        if (type === _enums_1.Tasks.views) {
            ctxErrors.views.status = true;
            ctxErrors.views.message = message;
        }
        if (type === _enums_1.Tasks.scripts) {
            ctxErrors.scripts.status = true;
            ctxErrors.scripts.message = message;
        }
        if (type === _enums_1.Tasks.styles) {
            ctxErrors.styles.status = true;
            ctxErrors.styles.message = message;
        }
    };
    const clearError = (type) => {
        if (type === _enums_1.Tasks.views) {
            ctxErrors.views.status = false;
            ctxErrors.views.message = '';
        }
        if (type === _enums_1.Tasks.scripts) {
            ctxErrors.scripts.status = false;
            ctxErrors.scripts.message = '';
        }
        if (type === _enums_1.Tasks.styles) {
            ctxErrors.styles.status = false;
            ctxErrors.styles.message = '';
        }
    };
    return {
        ctxErrors,
        setError,
        clearError
    };
}
exports.default = useError;
