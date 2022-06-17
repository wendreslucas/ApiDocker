import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'

const FormRestaurante: React.FC = () => {
  const parametros = useParams()
  const [restaurante, setRestaurante] = useState('')

  useEffect(() => {
    if (parametros.id) {
      axios
        .get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(response => setRestaurante(response.data.nome))
    }
  }, [parametros])

  const salvarNovoRestaurante = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (parametros.id) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, { nome: restaurante })
        .then(() => {
          alert('Restaurante atualizado com sucesso')
        })
    } else {
      axios
        .post('http://localhost:8000/api/v2/restaurantes/', {
          nome: restaurante
        })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!')
        })
    }
  }

  return (
    <form onSubmit={salvarNovoRestaurante}>
      <TextField
        label="Novo Restaurante"
        value={restaurante}
        onChange={e => setRestaurante(e.target.value)}
        variant="outlined"
      />
      <Button type="submit" variant="contained">
        Salvar
      </Button>
    </form>
  )
}

export default FormRestaurante
