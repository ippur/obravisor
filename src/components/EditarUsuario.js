// src/components/EditarUsuario.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo_usuario: '',
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://obravisor.onrender.com/usuarios/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(res.data);
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
        alert('Erro ao carregar dados do usuário.');
        navigate('/usuarios');
      }
    };

    fetchUsuario();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://obravisor.onrender.com/usuarios/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Usuário atualizado com sucesso!');
      navigate('/usuarios');
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      alert('Erro ao atualizar usuário.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Nome" name="nome" value={formData.nome} onChange={handleChange} />
        <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
        <InputField label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} />

        <div>
          <label className="block mb-1">Tipo de Usuário</label>
          <select
            name="tipo_usuario"
            value={formData.tipo_usuario}
            onChange={handleChange}
            className="w-full border p-2 rounded-xl"
            required
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

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value ?? ''}
      onChange={onChange}
      className="w-full border p-2 rounded-xl"
      required
    />
  </div>
);

export default EditarUsuario;
