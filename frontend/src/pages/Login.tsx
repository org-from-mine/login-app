import React, { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError('');

    // Validação básica do formulário
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const errorMessage = err.response?.data?.error;

        switch (status) {
          case 400:
            setError('Por favor, verifique os dados inseridos e tente novamente');
            break;
          case 401:
            setError('Email ou senha incorretos. Por favor, tente novamente');
            break;
          case 404:
            setError('Usuário não encontrado. Você já possui uma conta?');
            break;
          case 429:
            setError('Muitas tentativas de login. Por favor, aguarde alguns minutos');
            break;
          case 500:
            setError('Erro no servidor. Por favor, tente novamente mais tarde');
            break;
          default:
            setError(errorMessage || 'Ocorreu um erro inesperado. Tente novamente');
        }
        
        // Log do erro para debugging
        console.error('Login error:', {
          status,
          message: errorMessage,
          email: email // Não logue senhas!
        });
      } else {
        setError('Não foi possível conectar ao servidor. Verifique sua conexão');
        console.error('Unexpected error:', err);
      }
    }
  };

  // ...existing handleSubmit code...

  return (
    <div className="dark:bg-dark dark:text-dark min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="dark:text-dark text-3xl font-extrabold text-gray-900">
            Bem-vindo
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Faça login para acessar sua conta
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Fields */}
            <div className="p-2 space-y-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
              <Input
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Entrar
            </Button>
          </form>

          {/* Registration Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Novo por aqui?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link 
                to="/register" 
                className="font-medium text-primary-600 text-secondary-50 dark:text-primary-100 hover:text-light"
              >
                Criar uma nova conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};