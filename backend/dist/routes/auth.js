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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authController_2 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const prismaClient_1 = require("../prismaClient");
const router = (0, express_1.Router)();
router.post("/register", authController_2.register);
router.post("/login", authController_1.login);
router.get("/me", authMiddleware_1.authMiddleware, async (req, res) => {
    var _a;
    try {
        console.log("User na requisição:", req.user);
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
            return res.status(401).json({ error: "Não autorizado." });
        }
        const userInDb = await prismaClient_1.prisma.user.findUnique({
            where: {
                id: +req.user.userId,
            },
        });
        console.log("Usuário encontrado:", userInDb);
        if (!userInDb) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        const { password } = userInDb, safeUser = __rest(userInDb, ["password"]);
        return res.json({ user: safeUser });
    }
    catch (error) {
        console.error("Erro na rota /me:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map