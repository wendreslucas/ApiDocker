import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/AdmRestaurantes';
import NovoRestaurante from './paginas/Administracao/FormRestaurante';
import LayoutAdm from './paginas/Administracao/LayoutAdm';
import AdministracaoPratos from './paginas/Administracao/AdmPratos';
import FormPrato from './paginas/Administracao/FormPrato';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<LayoutAdm />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<NovoRestaurante />} />
        <Route path="restaurantes/:id" element={<NovoRestaurante />} />

        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormPrato />} />
        <Route path="pratos/:id" element={<FormPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
