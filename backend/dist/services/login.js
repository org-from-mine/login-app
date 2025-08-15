"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCredentials = verifyCredentials;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = require("./userService");
async function verifyCredentials(email, plainPassword) {
    const user = await (0, userService_1.findUSerByEmail)(email);
    if (!user)
        return null;
    const isValid = await bcrypt_1.default.compare(plainPassword, user.password);
    if (!isValid)
        return null;
    const { password } = user, safeUser = __rest(user, ["password"]);
    return safeUser;
}
//# sourceMappingURL=login.js.map