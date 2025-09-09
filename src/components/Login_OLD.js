// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.senha) {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('https://obravisor-backend.onrender.com/auth/login', formData);
      const { token, usuario } = res.data;
	localStorage.setItem('token', token);
	localStorage.setItem('tipo_usuario', usuario.tipo_usuario);
	navigate('/home');

    } catch (err) {
      console.error('Erro no login:', err);
      alert('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700">Obravisor</h1>
          <p className="text-gray-500 mt-1 text-sm">Sistema de consulta e cadastro de projetos</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 mt-4">
          © {new Date().getFullYear()} IPPUR. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default Login;
