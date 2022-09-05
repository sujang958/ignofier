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
exports.createFile = exports.ask = void 0;
const git_1 = require("./git");
const inquirer_1 = __importDefault(require("inquirer"));
const inquirer_autocomplete_prompt_1 = __importDefault(require("inquirer-autocomplete-prompt"));
const fs_1 = require("fs");
inquirer_1.default.registerPrompt("autocomplete", inquirer_autocomplete_prompt_1.default);
const ask = () => __awaiter(void 0, void 0, void 0, function* () {
    const choices = (yield (0, git_1.getIgnoreFiles)()).map(({ name, path }) => ({
        name,
        value: path,
    }));
    return yield inquirer_1.default.prompt([
        {
            type: "autocomplete",
            name: "selected",
            message: "Choice a file you want to add",
            source: (_, input) => choices.filter((choice) => choice.name.includes(input || "")),
            choices,
        },
    ]);
});
exports.ask = ask;
const createFile = (content, path) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, fs_1.existsSync)(path))
        if (!(yield inquirer_1.default.prompt({
            type: "confirm",
            name: "confirmed",
            message: "The file already exists, do you want to overwite?",
        })).confirmed)
            return console.log("Canceled");
    (0, fs_1.writeFileSync)(path, content);
});
exports.createFile = createFile;
