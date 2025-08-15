// src/api/auth.ts
export async function loginUser(email: string, password: string) {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔑 para enviar/receber cookies httpOnly
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Falha no login");
  }

  return res.json();
}
