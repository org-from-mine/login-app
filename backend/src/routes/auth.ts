import { Router, RequestHandler, Response } from "express";
import { login } from "../controllers/authController";
import { register } from "../controllers/authController"; // se já criou
import { authMiddleware } from "../middlewares/authMiddleware";
import { prisma } from "../prismaClient";

const router = Router();

router.post("/register", register);
router.post("/login", login as RequestHandler); // type assertion

router.get("/me", authMiddleware, async (req, res): Promise<Response> => {
  // busca info atualizada no DB
  try {
    console.log("User na requisição:", req.user); // Debug
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Não autorizado." });
    }

    const userInDb = await prisma.user.findUnique({
      where: {
        id: +req.user.userId,
      },
    });
    console.log("Usuário encontrado:", userInDb); // Debug
    if (!userInDb) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const { password, ...safeUser } = userInDb;
    return res.json({ user: safeUser });
  } catch (error) {
    console.error("Erro na rota /me:", error); // Debug
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
