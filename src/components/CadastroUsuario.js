// src/components/CadastroUsuario.js
import React, { useState } from 'react';
import axios from 'axios';

const CadastroUsuario = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    tipo: '',
    crea: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const payload = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha,
        tipo_usuario: formData.tipo,  // corrigido aqui!
        crea: formData.crea || null,   // CREA opcional
      };

      await axios.post('https://obravisor.onrender.com/usuarios', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Usuário cadastrado com sucesso!');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        tipo: '',
        crea: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Cadastrar Novo Usuário</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
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
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Tipo de Usuário</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl"
          >
            <option value="">Selecione</option>
            <option value="Engenheiro(a)">Engenheiro(a)</option>
            <option value="Fiscal">Fiscal</option>
            <option value="TI">TI</option>
            <option value="Auxiliar_Adm">Auxiliar_Adm</option>
            <option value="Coordenador(a)">Coordenador(a)</option>
            <option value="Diretor(a)">Diretor(a)</option>
          </select>
        </div>

        {formData.tipo === 'Engenheiro(a)' && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">CREA</label>
            <input
              type="text"
              name="crea"
              value={formData.crea}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroUsuario;
