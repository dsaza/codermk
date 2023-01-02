"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = exports.arrayJsonFilesToObject = exports.rdir = void 0;
const path_1 = __importDefault(require("path"));
function rdir(dir) {
    return dir.replaceAll(path_1.default.sep, '/');
}
exports.rdir = rdir;
function arrayJsonFilesToObject(collection) {
    const result = {};
    collection.forEach(item => {
        result[item.file] = item.data;
    });
    return result;
}
exports.arrayJsonFilesToObject = arrayJsonFilesToObject;
function getTime() {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let ampm;
    let hourPrint;
    let minutesPrint;
    let secondsPrint;
    ampm = hour > 11 ? 'p.m.' : 'a.m.';
    hour = hour > 12 ? hour - 12 : hour;
    hourPrint = hour > 9 ? `${hour}` : `0${hour}`;
    minutesPrint = minutes > 9 ? `${minutes}` : `0${minutes}`;
    secondsPrint = seconds > 9 ? `${seconds}` : `0${seconds}`;
    return `[${hourPrint}:${minutesPrint}:${secondsPrint} ${ampm}]`;
}
exports.getTime = getTime;
