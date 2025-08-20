import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

declare module "express" {
  interface Request {
    user?: {
      userId: string;
      email: string;
    };
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  try {
    const cookieName = process.env.COOKIE_NAME || "token";

    const token =
      req.cookies?.[cookieName] ||
      req.headers?.authorization?.replace("Bearer ", "") ||
      req.headers?.cookie
        ?.split(":")
        .find((c) => c.trim().startsWith(`${cookieName}=`))
        ?.split("=")[1];

    if (!token) {
      return res.status(401).json({ error: "Token não encontrado." });
    }

    const payload = verifyJwt<{ userId: string; email: string }>(token);
    console.log("Payload decodificado", payload);
    if (!payload) {
      return res.status(401).json({ error: "Token inválido" });
    }
    //anexar payload ao req para rotas subsequentes

    req.user = payload;
    next();
  } catch (err) {
    console.error("Erro detalhado:", err);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};
