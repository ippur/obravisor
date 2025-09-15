// src/components/EditarProjeto.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarProjeto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome_proprietario: '',
    endereco: '',
    codigo_projeto: '',
    eng_responsavel: '',
    crea: '',
    localizacao: '',
    situacao: '',
    debito_status: '',
    data_vencimento: '',
    parcelas: '',
  });

  const tipo_usuario = localStorage.getItem('tipo_usuario');
  const isReadOnly = tipo_usuario === 'Fiscal';
  const isDebitoOnly = tipo_usuario === 'Auxiliar_Adm';

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const res = await axios.get(`https://obravisor.onrender.com/projetos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          ...res.data,
          eng_responsavel: res.data.engenheiro_responsavel || '',
        });
      } catch (err) {
        console.error('Erro ao carregar projeto:', err);
        alert('Erro ao carregar projeto');
        navigate('/projetos');
      }
    };

    fetchProjeto();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Sessão expirada. Faça login novamente.');
        navigate('/');
        return;
      }

      const payload = {
        ...formData,
        engenheiro_responsavel: formData.eng_responsavel,
        data_vencimento: formData.debito_status === 'Emitido' ? formData.data_vencimento : null,
        parcelas: formData.debito_status === 'Emitido' ? formData.parcelas : null,
      };

      console.log('🔍 Enviando payload:', payload);

      await axios.put(`https://obravisor.onrender.com/projetos/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Projeto atualizado com sucesso!');
      navigate(`/projetos/${id}`);
    } catch (err) {
      console.error('Erro ao atualizar projeto:', err);
      if (err.response?.status === 401) {
        alert('Sessão expirada. Faça login novamente.');
        localStorage.removeItem('token');
        navigate('/');
      } else {
        alert('Erro ao atualizar projeto');
      }
    }
  };

  const canEditField = (name) => {
    if (tipo_usuario === 'TI' || tipo_usuario === 'Engenheiro(a)' || tipo_usuario === 'Diretor(a)') return true;
    if (tipo_usuario === 'Coordenador(a)' && name !== 'codigo_projeto') return true;
    if (tipo_usuario === 'Auxiliar_Adm' && ['debito_status', 'data_vencimento', 'parcelas'].includes(name)) return true;
    return false;
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Editar Projeto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Proprietário" name="nome_proprietario" value={formData.nome_proprietario} onChange={handleChange} readOnly={!canEditField('nome_proprietario')} />
        <InputField label="Endereço" name="endereco" value={formData.endereco} onChange={handleChange} readOnly={!canEditField('endereco')} />
        <InputField label="Código do Projeto" name="codigo_projeto" value={formData.codigo_projeto} onChange={handleChange} readOnly={!canEditField('codigo_projeto')} />
        <InputField label="Engenheiro Responsável" name="eng_responsavel" value={formData.eng_responsavel} onChange={handleChange} readOnly={!canEditField('eng_responsavel')} />
        <InputField label="CREA" name="crea" value={formData.crea} onChange={handleChange} readOnly={!canEditField('crea')} />
        <InputField label="Localização" name="localizacao" value={formData.localizacao} onChange={handleChange} readOnly={!canEditField('localizacao')} />

        <SelectField label="Situação" name="situacao" value={formData.situacao} onChange={handleChange} options={["Em andamento", "Concluído", "Parado"]} disabled={!canEditField('situacao')} />

        <SelectField label="Débito" name="debito_status" value={formData.debito_status} onChange={handleChange} options={["Emitido", "Pago", "Atrasado"]} disabled={!canEditField('debito_status')} />

        {formData.debito_status === 'Emitido' && (
          <>
            <InputField label="Data de Vencimento" name="data_vencimento" type="date" value={formData.data_vencimento} onChange={handleChange} readOnly={!canEditField('data_vencimento')} />
            <InputField label="Quantidade de Parcelas" name="parcelas" type="number" min="1" value={formData.parcelas} onChange={handleChange} readOnly={!canEditField('parcelas')} />
          </>
        )}

        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text', min, readOnly = false }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <input
      type={type}
      name={name}
      min={min}
      value={value ?? ''}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full border p-2 rounded-xl ${readOnly ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''}`}
      required={!['crea', 'eng_responsavel', 'localizacao'].includes(name)}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, disabled = false }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full border p-2 rounded-xl ${disabled ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''}`}
    >
      <option value="">Selecione</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default EditarProjeto;
