"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieService = void 0;
class CookieService {
    static getConfig() {
        return {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: this.MAX_AGE,
        };
    }
    static setAuthCookie(res, token) {
        res.cookie(this.COOKIE_NAME, token, this.getConfig());
    }
    static clearAuthCookie(res) {
        res.clearCookie(this.COOKIE_NAME);
    }
}
exports.CookieService = CookieService;
CookieService.COOKIE_NAME = process.env.COOKIE_NAME || "token";
CookieService.MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 900000;
//# sourceMappingURL=cookieConfig.js.map