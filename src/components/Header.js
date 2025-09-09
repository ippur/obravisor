// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo">
          <img src="/logo-icon.svg" alt="Logo Obravisor" className="logo-img" />
          <span>Obravisor</span>
        </div>
        <button className="hamburger" onClick={() => setMenuAberto(!menuAberto)}>
          ☰
        </button>
      </div>

      <nav className={`nav-links ${menuAberto ? 'show' : ''}`}>
        <Link to="/home">Home</Link>
        <Link to="/projetos">Listar Projetos</Link>

        {usuario?.tipo_usuario !== 'Auxiliar_Adm' && (
          <Link to="/projetos/cadastrar">Cadastrar Projeto</Link>
        )}

        <Link to="/usuarios">Listar Usuários</Link>
        <Link to="/usuarios/cadastrar">Cadastrar Usuário</Link>
        <Link to="/perfil">Meu Perfil</Link>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
