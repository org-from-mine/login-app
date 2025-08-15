import { Response, CookieOptions } from "express";

interface AuthCookieOptions extends CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  maxAge: number;
}

export class CookieService {
  private static readonly COOKIE_NAME = process.env.COOKIE_NAME || "token";
  private static readonly MAX_AGE =
    Number(process.env.COOKIE_MAX_AGE) || 900000;

  // private static getConfig(): AuthCookieOptions {
  //   return {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "lax",
  //     maxAge: this.MAX_AGE,
  //   };
  // }

  public static setAuthCookie(res: Response, token: string): void {
    // res.cookie(this.COOKIE_NAME, token, this.getConfig());
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: this.MAX_AGE,
      path: "/",
    };

    console.log("Configurando cookie:", {
      name: this.COOKIE_NAME,
      token: token.substring(0, 20) + "...",
      options: cookieOptions,
    });

    res.cookie(this.COOKIE_NAME, token, cookieOptions);
  }

  public static clearAuthCookie(res: Response): void {
    res.clearCookie(this.COOKIE_NAME);
  }
}
