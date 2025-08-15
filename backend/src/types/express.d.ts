declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
      email: string;
      // Adicione outros campos necessários do usuário aqui
    };
  }
}
