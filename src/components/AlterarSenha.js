// src/components/AlterarSenha.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlterarSenha = () => {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (novaSenha !== confirmarNovaSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const usuario = JSON.parse(localStorage.getItem('usuario'));

      await axios.put(
        `https://obravisor-backend.onrender.com/usuarios/${usuario.id}/senha`,
        {
          senha_atual: senhaAtual,
          nova_senha: novaSenha,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Senha alterada com sucesso!');
      navigate('/perfil');
    } catch (err) {
      console.error('Erro ao alterar senha:', err);
      alert('Erro ao alterar senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Alterar Senha</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Senha Atual</label>
          <input
            type="password"
            className="w-full border p-2 rounded-xl"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Nova Senha</label>
          <input
            type="password"
            className="w-full border p-2 rounded-xl"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Confirmar Nova Senha</label>
          <input
            type="password"
            className="w-full border p-2 rounded-xl"
            value={confirmarNovaSenha}
            onChange={(e) => setConfirmarNovaSenha(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? 'Salvando...' : 'Alterar Senha'}
        </button>
      </form>
    </div>
  );
};

export default AlterarSenha;
