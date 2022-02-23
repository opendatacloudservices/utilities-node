"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.files = exports.dollarList = void 0;
const files = require("./files");
exports.files = files;
const dollarList = (start, length) => {
    const r = [];
    for (let i = start; i < start + length; i += 1) {
        r.push(`$${i + 1}`);
    }
    return r.join(',');
};
exports.dollarList = dollarList;
//# sourceMappingURL=index.js.map