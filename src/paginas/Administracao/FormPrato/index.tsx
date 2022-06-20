import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'

import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import IPrato from '../../../interfaces/IPrato'
import api from '../../../services/api'

const FormPrato: React.FC = () => {
  const parametros = useParams()
  const [prato, setPrato] = useState('')

  useEffect(() => {
    if (parametros.id) {
      api.get<IPrato>(`/pratos/${parametros.id}/`).then(response => setPrato(response.data.nome))
    }
  }, [parametros])

  const salvarNovoPrato = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (parametros.id) {
      api.put(`/pratos/${parametros.id}/`, { nome: prato }).then(() => {
        alert('Prato atualizado com sucesso')
      })
    } else {
      api
        .post('/pratos/', {
          nome: prato
        })
        .then(() => {
          alert('prato cadastrado com sucesso!')
        })
    }
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h6">
              Formulário de Pratos
            </Typography>
            <Box component="form" onSubmit={salvarNovoPrato} sx={{ width: '50%' }}>
              <TextField
                fullWidth
                label="Novo Prato"
                onChange={e => setPrato(e.target.value)}
                required
                value={prato}
                variant="standard"
              />
              <Button fullWidth sx={{ marginTop: 1 }} type="submit" variant="outlined">
                Salvar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default FormPrato
