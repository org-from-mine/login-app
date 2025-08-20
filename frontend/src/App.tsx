import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/routing/PrivateRoute";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { ThemeToggle } from "./components/UI/ThemeToggle";

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
      <div className="min-h-screen bg-light dark:bg-dark 
      text-light dark:text-dark transition-colors duration-200">
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
          />
        </Routes>
      </div>  
      </BrowserRouter>
      </AuthProvider>
      </ThemeProvider>
  );
}