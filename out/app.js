#!/usr/bin/env node
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
const fs_1 = require("fs");
const path_1 = require("path");
const creation_1 = require("./creation");
const git_1 = require("./git");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, git_1.setup)();
    const { selected: chosenFile } = yield (0, creation_1.ask)();
    (0, creation_1.createFile)((0, fs_1.readFileSync)(chosenFile).toString("utf8"), (0, path_1.join)(process.cwd(), ".gitignore"));
});
run();
