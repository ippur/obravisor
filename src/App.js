import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import ListaProjetos from './components/ListaProjetos';
import CadastroProjeto from './components/CadastroProjeto';
import DetalheProjeto from './components/DetalheProjeto';
import EditarProjeto from './components/EditarProjeto';
import ListaUsuarios from './components/ListaUsuarios';
import CadastroUsuario from './components/CadastroUsuario';
import DetalheUsuario from './components/DetalheUsuario';
import EditarUsuario from './components/EditarUsuario';
import PerfilUsuario from './components/PerfilUsuario';
import AlterarSenhaAdmin from './components/AlterarSenhaAdmin';
import AlterarSenha from './components/AlterarSenha';

const App = () => {
  useEffect(() => {
    document.title = "Obravisor";
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<Login />} />

        {/* Rotas privadas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Header />
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/projetos"
          element={
            <PrivateRoute>
              <Header />
              <ListaProjetos />
            </PrivateRoute>
          }
        />
        <Route
          path="/projetos/cadastrar"
          element={
            <PrivateRoute>
              <Header />
              <CadastroProjeto />
            </PrivateRoute>
          }
        />
        <Route
          path="/projetos/:id"
          element={
            <PrivateRoute>
              <Header />
              <DetalheProjeto />
            </PrivateRoute>
          }
        />
        <Route
          path="/projetos/:id/editar"
          element={
            <PrivateRoute>
              <Header />
              <EditarProjeto />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <Header />
              <ListaUsuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/cadastrar"
          element={
            <PrivateRoute>
              <Header />
              <CadastroUsuario />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/:id"
          element={
            <PrivateRoute>
              <Header />
              <DetalheUsuario />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/:id/editar"
          element={
            <PrivateRoute>
              <Header />
              <EditarUsuario />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/:id/senha"
          element={
            <PrivateRoute>
              <Header />
              <AlterarSenhaAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Header />
              <PerfilUsuario />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/:id/alterar-senha"
          element={
            <PrivateRoute>
              <Header />
              <AlterarSenhaAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil/senha"
          element={
            <PrivateRoute>
              <Header />
              <AlterarSenha />
            </PrivateRoute>
          }
        />

        {/* Rota coringa */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
