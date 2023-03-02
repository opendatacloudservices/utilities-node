"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.next = exports.uniqueFolderList = exports.uniqueString = exports.nextFile = exports.createFolders = void 0;
const fs_1 = require("fs");
const createFolders = (path, folderLimit = 30, folderNameLimit = 10, folderDepthLimit = 4, level = 1) => {
    if (!(0, fs_1.existsSync)(path)) {
        throw new Error(`Path ${path} does not exist.`);
    }
    const folders = uniqueFolderList(folderLimit, folderNameLimit);
    folders.forEach(f => {
        const newFolder = path + '/' + f;
        (0, fs_1.mkdirSync)(newFolder);
        if (level < folderDepthLimit) {
            createFolders(newFolder, folderLimit, folderNameLimit, folderDepthLimit, level + 1);
        }
    });
};
exports.createFolders = createFolders;
const uniqueFolderList = (folderLimit = 30, folderNameLimit = 10) => {
    const folders = [];
    for (let f = 0; f < folderLimit; f += 1) {
        let folder = uniqueString(folderNameLimit);
        while (folders.includes(folder)) {
            folder = uniqueString();
        }
        folders.push(folder);
    }
    return folders;
};
exports.uniqueFolderList = uniqueFolderList;
const uniqueString = (folderNameLimit = 10) => {
    let str = '';
    const chars = 'abcdefghijklmnopqrstuvwxyz123456789'.split('');
    for (let i = 0; i < folderNameLimit; i += 1) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};
exports.uniqueString = uniqueString;
const nextFile = (path, folderLimit = 30, folderNameLimit = 10, folderDepthLimit = 4) => {
    if (!(0, fs_1.existsSync)(path)) {
        throw new Error(`Path ${path} does not exist.`);
    }
    const nFile = next(path, folderLimit, folderNameLimit, folderDepthLimit);
    if (nFile === null) {
        throw new Error('Could not determin next file.');
    }
    return nFile;
};
exports.nextFile = nextFile;
const next = (path, folderLimit = 30, folderNameLimit = 10, folderDepthLimit = 4, level = 1) => {
    if (!(0, fs_1.existsSync)(path)) {
        throw new Error(`Path ${path} does not exist.`);
    }
    if ((0, fs_1.existsSync)(path + '/.isFull')) {
        // no reason to dig deeper, this path is full
        return null;
    }
    if (level > folderDepthLimit) {
        if ((0, fs_1.readdirSync)(path).length < folderLimit) {
            return path + '/' + uniqueString(folderNameLimit);
        }
        else {
            return null;
        }
    }
    else {
        let n = null;
        const files = (0, fs_1.readdirSync)(path);
        for (let f = 0; f < files.length && n === null; f++) {
            const file = path + '/' + files[f];
            if (n === null && (0, fs_1.lstatSync)(file).isDirectory()) {
                n = next(file, folderLimit, folderNameLimit, folderDepthLimit, level + 1);
            }
        }
        if (n === null) {
            // looks like this folder is full
            // let's mark as full and never return
            (0, fs_1.writeFileSync)(path + '/.isFull', '', 'utf-8');
        }
        return n;
    }
};
exports.next = next;
//# sourceMappingURL=files.js.map