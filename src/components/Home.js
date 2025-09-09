// src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 p-6">
      <img
        src="/ippur-logo.png" // ← referência para onde a logo estará na pasta 'public'
        alt="Logo IPPUR"
        className="w-48 mb-6"
      />
      <h1 className="text-3xl font-bold text-blue-800 mb-2">Bem-vindo ao Sistema Obravisor</h1>
      <p className="text-center text-gray-700 max-w-xl">
        Este sistema foi desenvolvido para gerenciar projetos, usuários e operações internas do IPPUR - Instituto de Pesquisa, Planejamento Urbano e Desenvolvimento Sustentável do Município de Redenção.
      </p>
    </div>
  );
};

export default Home;
