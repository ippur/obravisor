// src/components/DetalheUsuario.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetalheUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://obravisor.onrender.com/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(res.data);
      } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        alert('Erro ao carregar detalhes do usuário.');
        navigate('/usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://obravisor.onrender.com/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Usuário excluído com sucesso.');
        navigate('/usuarios');
      } catch (err) {
        console.error('Erro ao excluir usuário:', err);
        alert('Erro ao excluir usuário.');
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500">Carregando usuário...</p>;
  if (!usuario) return null;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Detalhes do Usuário</h2>
      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Telefone:</strong> {usuario.telefone || '—'}</p>
      <p><strong>Tipo de Usuário:</strong> {usuario.tipo_usuario || '—'}</p>

      <div className="flex gap-4 mt-6 flex-wrap">
        <button
          onClick={() => navigate(`/usuarios/${usuario.id}/editar`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
        >
          Excluir
        </button>

        {usuarioLogado?.tipo_usuario === 'TI' && (
          <button
            onClick={() => navigate(`/usuarios/${usuario.id}/senha`)}
            className="bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700"
          >
            Alterar Senha
          </button>
        )}
      </div>
    </div>
  );
};

export default DetalheUsuario;
