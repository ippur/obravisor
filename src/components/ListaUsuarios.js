// src/components/ListaUsuarios.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://obravisor.onrender.com/usuarios', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(res.data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        alert('Erro ao buscar usuários.');
      }
    };
    fetchUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase()) ||
    u.email.toLowerCase().includes(busca.toLowerCase()) ||
    u.tipo_usuario.toLowerCase().includes(busca.toLowerCase())
  );

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      usuariosFiltrados.map((u) => ({
        Nome: u.nome,
        Email: u.email,
        Telefone: u.telefone,
        Tipo: u.tipo_usuario,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuários');
    XLSX.writeFile(wb, 'usuarios.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Usuários Cadastrados', 14, 16);
    autoTable(doc, {
      head: [['Nome', 'Email', 'Telefone', 'Tipo']],
      body: usuariosFiltrados.map(u => [
        u.nome, u.email, u.telefone || '—', u.tipo_usuario
      ]),
      startY: 20,
    });
    doc.save('usuarios.pdf');
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Usuários Cadastrados</h2>

      <input
        type="text"
        placeholder="Buscar por nome, email ou tipo de usuário"
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

      {usuariosFiltrados.length === 0 ? (
        <p className="text-gray-600">Nenhum usuário encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {usuariosFiltrados.map((u) => (
            <li key={u.id} className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p><strong>Nome:</strong> {u.nome}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Telefone:</strong> {u.telefone || '—'}</p>
              <p><strong>Tipo:</strong> {u.tipo_usuario}</p>
              <Link
                to={`/usuarios/${u.id}`}
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

export default ListaUsuarios;
