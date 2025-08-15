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
exports.createUser = createUser;
exports.findUSerByEmail = findUSerByEmail;
const prismaClient_1 = require("../prismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function createUser(email, plainPassword, name) {
    const hashed = await bcrypt_1.default.hash(plainPassword, 10);
    const user = await prismaClient_1.prisma.user.create({
        data: {
            email,
            password: hashed,
            name,
        },
    });
    const { password } = user, safeUser = __rest(user, ["password"]);
    return safeUser;
}
async function findUSerByEmail(email) {
    return prismaClient_1.prisma.user.findUnique({ where: { email } });
}
//# sourceMappingURL=userService.js.map