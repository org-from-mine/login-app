import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", authRoutes);

// Rota para a página de teste
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "test.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`
    🚀 Server running on http://localhost:${PORT}
    📝 API endpoints:
    POST /api/login
    POST /api/register
    GET /api/me
  `);
});
