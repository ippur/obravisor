// src/components/PerfilUsuario.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('usuario'));

        if (!user?.id || !token) {
          alert('Sessão expirada. Faça login novamente.');
          window.location.href = '/';
          return;
        }

        const res = await axios.get(`https://obravisor-backend.onrender.com/usuarios/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsuario(res.data);
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        alert('Erro ao carregar informações do usuário.');
      }
    };

    fetchPerfil();
  }, []);

  if (!usuario) return null;

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Meu Perfil</h2>

      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Telefone:</strong> {usuario.telefone || '—'}</p>
      <p><strong>Tipo de Usuário:</strong> {usuario.tipo_usuario}</p>

      <button
        onClick={() => navigate(`/usuarios/${usuario.id}/senha`)}
        className="mt-6 bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700 transition"
      >
        Alterar Senha
      </button>
    </div>
  );
};

export default PerfilUsuario;
