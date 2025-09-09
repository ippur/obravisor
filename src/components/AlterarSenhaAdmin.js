// src/components/AlterarSenhaAdmin.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AlterarSenhaAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!novaSenha || !confirmarSenha) {
      return alert('Preencha todos os campos.');
    }

    if (novaSenha !== confirmarSenha) {
      return alert('As senhas não coincidem.');
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      await axios.put(
        `https://obravisor-backend.onrender.com/usuarios/${id}/senha/admin`,
        { nova_senha: novaSenha }, // <- CORREÇÃO: nome correto esperado pelo backend
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Senha alterada com sucesso.');
      navigate(`/usuarios/${id}`);
    } catch (err) {
      console.error('Erro ao alterar senha:', err);
      alert('Erro ao alterar senha. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Alterar Senha do Usuário</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nova Senha</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            className="w-full border p-2 rounded-xl"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Confirmar Nova Senha</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            className="w-full border p-2 rounded-xl"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-xl text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Salvando...' : 'Alterar Senha'}
        </button>
      </form>
    </div>
  );
};

export default AlterarSenhaAdmin;
