"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
}));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/api", auth_1.default);
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "test.html"));
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`
    🚀 Server running on http://localhost:${PORT}
    📝 API endpoints:
    POST /api/login
    POST /api/register
    GET /api/me
  `);
});
//# sourceMappingURL=app.js.map