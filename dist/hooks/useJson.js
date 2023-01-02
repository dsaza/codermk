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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = require("../lib/glob");
function getDataJson() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = [];
        let jsonFiles = yield (0, glob_1.getFiles)('./data/*.json');
        jsonFiles.forEach(file => {
            try {
                const json = fs_1.default.readFileSync(file, 'utf8');
                const filename = path_1.default.basename(file).replace('.json', '');
                data.push({
                    file: filename,
                    data: JSON.parse(json)
                });
            }
            catch (error) {
                data = [];
            }
        });
        return data;
    });
}
function useJson() {
    return {
        getDataJson
    };
}
exports.default = useJson;
