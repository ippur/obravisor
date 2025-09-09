// src/components/CadastroProjeto.js
import React, { useState } from 'react';
import axios from 'axios';

const CadastroProjeto = () => {
  const [formData, setFormData] = useState({
    nome_proprietario: '',
    endereco: '',
    codigo_projeto: '',
    engenheiro_responsavel: '',
    crea: '',
    situacao: '',
    debito_status: '',
    data_vencimento: '',
    parcelas: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const payload = {
        ...formData,
        parcelas: formData.debito_status === 'Emitido' ? Number(formData.parcelas) : null,
        data_vencimento: formData.debito_status === 'Emitido' ? formData.data_vencimento : null,
      };

      await axios.post('https://obravisor-backend.onrender.com/projetos', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Projeto cadastrado com sucesso!');
      setFormData({
        nome_proprietario: '',
        endereco: '',
        codigo_projeto: '',
        engenheiro_responsavel: '',
        crea: '',
        situacao: '',
        debito_status: '',
        data_vencimento: '',
        parcelas: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar projeto:', error);
      alert('Erro ao cadastrar projeto');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Cadastrar Novo Projeto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nome_proprietario" placeholder="Nome do Proprietário" className="w-full p-2 border rounded-xl" value={formData.nome_proprietario} onChange={handleChange} required />
        <input type="text" name="endereco" placeholder="Endereço" className="w-full p-2 border rounded-xl" value={formData.endereco} onChange={handleChange} required />
        <input type="text" name="codigo_projeto" placeholder="Código do Projeto" className="w-full p-2 border rounded-xl" value={formData.codigo_projeto} onChange={handleChange} required />
        <input type="text" name="engenheiro_responsavel" placeholder="Engenheiro Responsável" className="w-full p-2 border rounded-xl" value={formData.engenheiro_responsavel} onChange={handleChange} />
        <input type="text" name="crea" placeholder="CREA" className="w-full p-2 border rounded-xl" value={formData.crea} onChange={handleChange} />

        <select name="situacao" className="w-full p-2 border rounded-xl" value={formData.situacao} onChange={handleChange} required>
          <option value="">Situação</option>
          <option value="Ativo">Ativo</option>
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
        </select>

        <select name="debito_status" className="w-full p-2 border rounded-xl" value={formData.debito_status} onChange={handleChange}>
          <option value="">Débito</option>
          <option value="Emitido">Emitido</option>
          <option value="Pago">Pago</option>
          <option value="Atrasado">Atrasado</option>
        </select>

        {formData.debito_status === 'Emitido' && (
          <>
            <input
              type="date"
              name="data_vencimento"
              className="w-full p-2 border rounded-xl"
              value={formData.data_vencimento}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="parcelas"
              className="w-full p-2 border rounded-xl"
              placeholder="Número de Parcelas"
              value={formData.parcelas}
              onChange={handleChange}
              min={1}
              required
            />
          </>
        )}

        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroProjeto;
