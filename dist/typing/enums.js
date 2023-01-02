"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = exports.Dirp = exports.Mode = void 0;
var Mode;
(function (Mode) {
    Mode["dev"] = "--dev";
    Mode["build"] = "--build";
})(Mode = exports.Mode || (exports.Mode = {}));
var Dirp;
(function (Dirp) {
    Dirp["tmp"] = "tmp";
    Dirp["root"] = "root";
})(Dirp = exports.Dirp || (exports.Dirp = {}));
var Tasks;
(function (Tasks) {
    Tasks["views"] = "views";
    Tasks["viewsPretty"] = "viewsPretty";
    Tasks["scripts"] = "scripts";
    Tasks["scriptsMinify"] = "scriptsMinify";
    Tasks["styles"] = "styles";
    Tasks["stylesFull"] = "stylesFull";
    Tasks["cleaner"] = "cleaner";
    Tasks["cleanerFinal"] = "cleanerFinal";
    Tasks["server"] = "server";
    Tasks["assets"] = "assets";
})(Tasks = exports.Tasks || (exports.Tasks = {}));
