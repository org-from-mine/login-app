import { prisma } from "../prismaClient";
import bcrypt from "bcrypt";

//Exemplo de criação de usuário (com hashing de senha usando bcrypt):
export async function createUser(
  email: string,
  plainPassword: string,
  name?: string
) {
  const hashed = await bcrypt.hash(plainPassword, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
    },
  });

  const { password, ...safeUser } = user;
  return safeUser;
}

export async function findUSerByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
