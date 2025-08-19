import { Response, CookieOptions } from "express";

export class CookieService {
  private static readonly COOKIE_NAME = process.env.COOKIE_NAME || "token";
  private static readonly MAX_AGE =
    Number(process.env.COOKIE_MAX_AGE) || 900000;

  public static setAuthCookie(res: Response, token: string): void {
    const cookieOptions: CookieOptions = {
      httpOnly: false,
      secure: false, // Importante: false em desenvolvimento
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

  public static clearAuthCookie(res: Response): void {
    res.clearCookie(this.COOKIE_NAME);
  }
}
