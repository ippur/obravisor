// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipo_usuario');
    window.location.href = '/';
  };

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return (
    <header className="bg-white shadow p-4 mb-4 flex items-center justify-between">
      <div className="flex justify-center flex-1 space-x-6">
        <Link to="/home" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/projetos" className="text-blue-600 hover:underline">Listar Projetos</Link>

        {/* Só mostra o botão "Cadastrar Projeto" se NÃO for Auxiliar_Adm */}
        {usuario?.tipo_usuario !== 'Auxiliar_Adm' && (
          <Link to="/projetos/cadastrar" className="text-blue-600 hover:underline">Cadastrar Projeto</Link>
        )}

        <Link to="/usuarios/cadastrar" className="text-blue-600 hover:underline">Cadastrar Usuário</Link>
        <Link to="/usuarios" className="text-blue-600 hover:underline">Listar Usuários</Link>
        <Link to="/perfil" className="text-blue-600 hover:underline">Meu Perfil</Link>
      </div>

      <div className="flex justify-end w-32">
        <button onClick={handleLogout} className="text-red-600 hover:underline">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
