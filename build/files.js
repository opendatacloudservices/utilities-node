"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileCount = exports.getPath = exports.createFolders = void 0;
const fs_1 = require("fs");
const folderLimit = 30;
const folderNameLimit = 10;
const folderDepthLimit = 6;
const createFolders = (path, level = 1) => {
    const folders = uniqueFolderList();
    folders.forEach(f => {
        const newFolder = path + '/' + f;
        (0, fs_1.mkdirSync)(newFolder);
        if (level < folderDepthLimit) {
            createFolders(newFolder);
        }
    });
};
exports.createFolders = createFolders;
const uniqueFolderList = () => {
    const folders = [];
    for (let f = 0; f < folderLimit; f += 1) {
        let folder = uniqueString();
        while (folders.includes(folder)) {
            folder = uniqueString();
        }
        folders.push(folder);
    }
    return folders;
};
const uniqueString = () => {
    let str = '';
    const chars = 'abcdefghijklmnopqrstuvwxyz123456789'.split('');
    for (let i = 0; i < folderNameLimit; i += 1) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};
const getPath = (path, folderIds) => {
    let fullPath = path;
    for (let l = 0; l < folderDepthLimit; l += 1) {
        const folders = (0, fs_1.readdirSync)(fullPath);
        fullPath += '/' + folders[folderIds[l]];
    }
    return fullPath;
};
exports.getPath = getPath;
const fileCount = (path) => {
    return (0, fs_1.readdirSync)(path).length;
};
exports.fileCount = fileCount;
//# sourceMappingURL=files.js.map