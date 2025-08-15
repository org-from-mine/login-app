import { Request, Response, type RequestHandler } from "express";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createAuthToken } from "../utils/jwt";
import { prisma } from "../prismaClient";

// interface RegisterBody {
//   email?: string;
//   password?: string;
//   name?: string;
// }

interface LoginBody {
  email?: string;
  password?: string;
}

export const register: RequestHandler = async (req, res) => {
  try {
    const { email, password, name } = req.body ?? {};

    // 1) Validação básica
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail.length === 0) {
      return res.status(400).json({ error: "Email inválido." });
    }

    // senha mínima + regra simples (você pode melhorar)
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Senha deve ter pelo menos 8 caracteres." });
    }
    // exemplo de regra extra (letras + números)
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!pwdRegex.test(password)) {
      return res
        .status(400)
        .json({ error: "Senha deve conter letras e números." });
    }

    // 2) Verifica se usuário já existe
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) {
      return res.status(409).json({ error: "Email já cadastrado." });
    }

    // 3) Hash da senha
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    const hashed = await bcrypt.hash(password, saltRounds);

    // 4) Cria o usuário no BD
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashed,
        name: name ?? null,
      },
    });

    // 5) REMOVA o campo password antes de enviar ao cliente
    // (vai virar undefined localmente para não expor o hash)
    const { password: _p, ...safeUser } = user;

    createAuthToken(
      {
        userId: user.id.toString(),
        email: user.email,
      },
      res
    );

    // 7) Retorna 201 com usuário sem senha
    return res.status(201).json({ user: safeUser });
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return res
        .status(409)
        .json({ error: "Email já cadastrado (unique constraint)." });
    }
    console.error("register error:");
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Cria o token e configura o cookie em uma única chamada
    createAuthToken(
      {
        userId: user.id.toString(),
        email: user.email,
      },
      res
    );

    const { password: _, ...safeUser } = user;
    return res.json({ user: safeUser });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};
