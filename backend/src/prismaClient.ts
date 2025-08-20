import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

//Função para deletar todos os usuários (apenas para testes, não deve ser usada em produção):
// async function deleteAllUsers() {
//   try {
//     const deletedCount = await prisma.user.deleteMany();
//     console.log(`Deleted ${deletedCount.count}.users`);
//   } catch (error) {
//     console.error("Error deleting users:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// deleteAllUsers();
