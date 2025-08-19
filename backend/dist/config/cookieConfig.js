"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieService = void 0;
class CookieService {
    static setAuthCookie(res, token) {
        const cookieOptions = {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            maxAge: this.MAX_AGE,
            path: "/",
            domain: "localhost",
        };
        console.log("Debug cookie:", {
            name: this.COOKIE_NAME,
            tokenPreview: token.substring(0, 20) + "...",
            options: cookieOptions,
        });
        res.cookie(this.COOKIE_NAME, token, cookieOptions);
    }
    static clearAuthCookie(res) {
        res.clearCookie(this.COOKIE_NAME);
    }
}
exports.CookieService = CookieService;
CookieService.COOKIE_NAME = process.env.COOKIE_NAME || "token";
CookieService.MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 900000;
//# sourceMappingURL=cookieConfig.js.map