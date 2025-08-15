"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
exports.createAuthToken = createAuthToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookieConfig_1 = require("../config/cookieConfig");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não definido no .env");
}
function signJwt(payload, expiresIn) {
    const options = {
        expiresIn: (expiresIn || JWT_EXPIRES_IN),
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
}
function verifyJwt(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (err) {
        return null;
    }
}
function createAuthToken(payload, res, expiresIn) {
    const token = signJwt(payload, expiresIn);
    cookieConfig_1.CookieService.setAuthCookie(res, token);
    return token;
}
//# sourceMappingURL=jwt.js.map