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
exports.getIgnoreFiles = exports.setup = exports.pullRepo = exports.cloneRepo = exports.checkCloned = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const simple_git_1 = __importDefault(require("simple-git"));
const DIR = (0, path_1.join)(__dirname, "../git/");
const git = (0, simple_git_1.default)(DIR);
const checkCloned = () => __awaiter(void 0, void 0, void 0, function* () { return (0, fs_1.existsSync)((0, path_1.join)(DIR, ".git/config")); });
exports.checkCloned = checkCloned;
const cloneRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    yield git.clone("https://github.com/github/gitignore", ".");
});
exports.cloneRepo = cloneRepo;
const pullRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    yield git.pull("origin", "main");
});
exports.pullRepo = pullRepo;
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, exports.checkCloned)())
        (0, exports.pullRepo)();
    else
        (0, exports.cloneRepo)();
});
exports.setup = setup;
const getIgnoreFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, fs_1.readdirSync)(DIR)
        .filter((file) => file.endsWith(".gitignore"))
        .map((file) => ({
        name: file,
        path: (0, path_1.join)(DIR, file),
    }));
});
exports.getIgnoreFiles = getIgnoreFiles;
