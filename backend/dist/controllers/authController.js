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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const library_1 = require("@prisma/client/runtime/library");
const jwt_1 = require("../utils/jwt");
const prismaClient_1 = require("../prismaClient");
const register = async (req, res) => {
    var _a;
    try {
        const { email, password, name } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        if (!email || !password) {
            return res.status(400).json({ error: "Email e senha são obrigatórios." });
        }
        const normalizedEmail = email.trim().toLowerCase();
        if (normalizedEmail.length === 0) {
            return res.status(400).json({ error: "Email inválido." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({ error: "Senha deve ter pelo menos 8 caracteres." });
        }
        const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (!pwdRegex.test(password)) {
            return res
                .status(400)
                .json({ error: "Senha deve conter letras e números." });
        }
        const existing = await prismaClient_1.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });
        if (existing) {
            return res.status(409).json({ error: "Email já cadastrado." });
        }
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
        const hashed = await bcrypt_1.default.hash(password, saltRounds);
        const user = await prismaClient_1.prisma.user.create({
            data: {
                email: normalizedEmail,
                password: hashed,
                name: name !== null && name !== void 0 ? name : null,
            },
        });
        const { password: _p } = user, safeUser = __rest(user, ["password"]);
        (0, jwt_1.createAuthToken)({
            userId: user.id.toString(),
            email: user.email,
        }, res);
        return res.status(201).json({ user: safeUser });
    }
    catch (err) {
        if (err instanceof library_1.PrismaClientKnownRequestError && err.code === "P2002") {
            return res
                .status(409)
                .json({ error: "Email já cadastrado (unique constraint)." });
        }
        console.error("register error:");
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};
exports.register = register;
const login = async (req, res) => {
    var _a;
    try {
        const { email, password } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        if (!email || !password) {
            return res.status(400).json({ error: "Email e senha são obrigatórios." });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const user = await prismaClient_1.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });
        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }
        (0, jwt_1.createAuthToken)({
            userId: user.id.toString(),
            email: user.email,
        }, res);
        const { password: _ } = user, safeUser = __rest(user, ["password"]);
        return res.json({ user: safeUser });
    }
    catch (err) {
        console.error("login error:", err);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map