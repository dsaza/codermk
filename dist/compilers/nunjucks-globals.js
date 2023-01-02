"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvGlobals = void 0;
const _enums_1 = require("../typing/enums.js");
const helpers_1 = require("../lib/helpers");
const _hooks_1 = require("../hooks/index.js");
function getEnvGlobals(data) {
    const { config } = (0, _hooks_1.useConfig)();
    const { mode } = (0, _hooks_1.useMode)();
    let hashNow = Date.now();
    let hrefCacheBust = (path) => config.bustcacheEnabled ? `${path}?t=${hashNow}` : path;
    let dataJson = (0, helpers_1.arrayJsonFilesToObject)(data);
    return {
        __mkdata: dataJson,
        isDev: () => mode === _enums_1.Mode.dev,
        isBuild: () => mode === _enums_1.Mode.build,
        static: (dir) => mode === _enums_1.Mode.build
            ? hrefCacheBust(`./assets/${dir}`)
            : `/${dir}`,
        style: (file) => mode === _enums_1.Mode.build
            ? hrefCacheBust(`./assets/css/${file.trim().replace('.scss', '-codermk.min.css')}`)
            : `/__compiled/${file.trim().replace('.scss', '.css')}`,
        module: (file) => mode === _enums_1.Mode.build
            ? hrefCacheBust(`./assets/js/${file.trim().replace('.js', '-codermk.min.js')}`)
            : `/__compiled/${file.trim()}`,
        page: (page, restURL) => {
            if (page === '.') {
                return mode === _enums_1.Mode.build
                    ? `./${typeof restURL === 'string' ? restURL.trim() : ''}`
                    : `/${typeof restURL === 'string' ? restURL.trim() : ''}`;
            }
            return mode === _enums_1.Mode.build
                ? `./${page}.html${typeof restURL === 'string' ? restURL.trim() : ''}`
                : `/${page}.html${typeof restURL === 'string' ? restURL.trim() : ''}`;
        },
    };
}
exports.getEnvGlobals = getEnvGlobals;
