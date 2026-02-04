"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortId = void 0;
const nanoid_1 = require("nanoid");
const generateShortId = (i) => {
    return (0, nanoid_1.nanoid)(8 + i);
};
exports.generateShortId = generateShortId;
//# sourceMappingURL=shortener.js.map