import { Box, Button, TextField, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'
import api from '../../../services/api'

const FormRestaurante: React.FC = () => {
  const parametros = useParams()
  const [restaurante, setRestaurante] = useState('')

  useEffect(() => {
    if (parametros.id) {
      api
        .get<IRestaurante>(`/restaurantes/${parametros.id}/`)
        .then(response => setRestaurante(response.data.nome))
    }
  }, [parametros])

  const salvarNovoRestaurante = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (parametros.id) {
      api.put(`/restaurantes/${parametros.id}/`, { nome: restaurante }).then(() => {
        alert('Restaurante atualizado com sucesso')
      })
    } else {
      api
        .post('/restaurantes/', {
          nome: restaurante
        })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!')
        })
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" onSubmit={salvarNovoRestaurante}>
        <TextField
          fullWidth
          label="Novo Restaurante"
          onChange={e => setRestaurante(e.target.value)}
          required
          value={restaurante}
          variant="standard"
        />
        <Button fullWidth sx={{ marginTop: 1 }} type="submit" variant="outlined">
          Salvar
        </Button>
      </Box>
    </Box>
  )
}

export default FormRestaurante
