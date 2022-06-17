import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './paginas/Home'
import VitrineRestaurantes from './paginas/VitrineRestaurantes'
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes'
import NovoRestaurante from './paginas/Administracao/FormRestaurante'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<NovoRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<NovoRestaurante />} />
    </Routes>
  )
}

export default App
