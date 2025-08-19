"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const cookieName = process.env.COOKIE_NAME || "token";
        console.log("=== Debug Cookies ===");
        console.log("Request URL:", req.url);
        console.log("Request Method:", req.method);
        console.log("Headers completos:", JSON.stringify(req.headers, null, 2));
        console.log("Cookie header bruto:", req.headers.cookie);
        console.log("Cookies parseados:", req.cookies);
        console.log("Cookie específico:", (_a = req.cookies) === null || _a === void 0 ? void 0 : _a[cookieName]);
        console.log("===================");
        const token = ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b[cookieName]) ||
            ((_d = (_c = req.headers) === null || _c === void 0 ? void 0 : _c.authorization) === null || _d === void 0 ? void 0 : _d.replace("Bearer ", "")) ||
            ((_g = (_f = (_e = req.headers) === null || _e === void 0 ? void 0 : _e.cookie) === null || _f === void 0 ? void 0 : _f.split(":").find((c) => c.trim().startsWith(`${cookieName}=`))) === null || _g === void 0 ? void 0 : _g.split("=")[1]);
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
        console.error("Erro detalhado:", err);
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map