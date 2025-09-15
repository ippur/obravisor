// src/components/ListaProjetos.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ListaProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://obravisor.onrender.com/projetos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjetos(res.data);
      } catch (err) {
        console.error('Erro ao buscar projetos:', err);
        alert('Erro ao buscar projetos');
      }
    };
    fetchProjetos();
  }, []);

  const filtrados = projetos.filter((p) =>
    p.nome_proprietario?.toLowerCase().includes(busca.toLowerCase()) ||
    p.endereco?.toLowerCase().includes(busca.toLowerCase()) ||
    p.codigo_projeto?.toLowerCase().includes(busca.toLowerCase())
  );

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filtrados.map((p) => ({
        Proprietário: p.nome_proprietario,
        Endereço: p.endereco,
        Código: p.codigo_projeto,
        Situação: p.situacao,
        Débito: p.debito_status,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Projetos');
    XLSX.writeFile(wb, 'projetos.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Projetos Cadastrados', 14, 16);
    autoTable(doc, {
      head: [['Proprietário', 'Endereço', 'Código', 'Situação', 'Débito']],
      body: filtrados.map(p => [
        p.nome_proprietario,
        p.endereco,
        p.codigo_projeto,
        p.situacao,
        p.debito_status
      ]),
      startY: 20,
    });
    doc.save('projetos.pdf');
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Projetos Cadastrados</h2>

      <input
        type="text"
        placeholder="Buscar por nome, endereço ou código"
        className="w-full p-2 border rounded-xl mb-4"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="flex gap-4 mb-4">
        <button onClick={exportarExcel} className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
          Exportar Excel
        </button>
        <button onClick={exportarPDF} className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
          Exportar PDF
        </button>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-gray-600">Nenhum projeto encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {filtrados.map((projeto) => (
            <li key={projeto.id} className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p><strong>Proprietário:</strong> {projeto.nome_proprietario}</p>
              <p><strong>Endereço:</strong> {projeto.endereco}</p>
              <p><strong>Código:</strong> {projeto.codigo_projeto}</p>
              <Link
                to={`/projetos/${projeto.id}`}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Ver detalhes
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaProjetos;
