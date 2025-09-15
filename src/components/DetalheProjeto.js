// src/components/DetalheProjeto.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetalheProjeto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projeto, setProjeto] = useState(null);

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://obravisor.onrender.com/projetos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjeto(res.data);
      } catch (err) {
        console.error('Erro ao buscar projeto:', err);
        alert('Erro ao carregar detalhes do projeto.');
      }
    };

    fetchProjeto();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://obravisor.onrender.com/projetos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Projeto excluído com sucesso.');
        navigate('/projetos');
      } catch (err) {
        console.error('Erro ao excluir projeto:', err);
        alert('Erro ao excluir projeto.');
      }
    }
  };

  if (!projeto) return null;

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const tipo = usuario?.tipo_usuario;

  const podeEditar = ['Engenheiro(a)', 'Auxiliar_Adm', 'TI'].includes(tipo);
  const podeExcluir = ['Engenheiro(a)', 'TI'].includes(tipo);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Detalhes do Projeto</h2>
      <p><strong>Proprietário:</strong> {projeto.nome_proprietario}</p>
      <p><strong>Endereço:</strong> {projeto.endereco}</p>
      <p><strong>Código:</strong> {projeto.codigo_projeto}</p>
      <p><strong>Engenheiro:</strong> {projeto.engenheiro_responsavel || '—'}</p>
      <p><strong>CREA:</strong> {projeto.crea || '—'}</p>
      <p><strong>Situação:</strong> {projeto.situacao || '—'}</p>
      <p><strong>Débito:</strong> {projeto.debito_status || '—'}</p>
      {projeto.debito_status === 'Atrasado' && projeto.dias_em_atraso > 0 && (
        <p><strong>Dias em Atraso:</strong> {projeto.dias_em_atraso}</p>
      )}

      {(podeEditar || podeExcluir) && (
        <div className="flex gap-4 mt-6">
          {podeEditar && (
            <button
              onClick={() => navigate(`/projetos/${projeto.id}/editar`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              Editar
            </button>
          )}
          {podeExcluir && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
            >
              Excluir
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DetalheProjeto;
