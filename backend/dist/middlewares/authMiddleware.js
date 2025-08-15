"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    var _a, _b;
    try {
        const cookieName = process.env.COOKIE_NAME || "token";
        console.log("Cookies recebidos", req.cookies);
        console.log("Token específico", (_a = req.cookies) === null || _a === void 0 ? void 0 : _a[cookieName]);
        const token = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b[cookieName];
        if (!token) {
            return res.status(401).json({ error: "Token não encontrado." });
        }
        const payload = (0, jwt_1.verifyJwt)(token);
        console.log("Payload decodificado", payload);
        if (!payload) {
            return res.status(401).json({ error: "Token inválido" });
        }
        req.user = payload;
        next();
    }
    catch (err) {
        console.error("Erro no middleware de autenticação:", err);
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map