"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dollarList = void 0;
exports.dollarList = (start, length) => {
    const r = [];
    for (let i = start; i < start + length; i += 1) {
        r.push(`$${i + 1}`);
    }
    return r.join(',');
};
//# sourceMappingURL=index.js.map