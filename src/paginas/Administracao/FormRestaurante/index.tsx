import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const FormRestaurante: React.FC = () => {
  const [restaurante, setRestaurante] = useState('')

  const salvarNovoRestaurante = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios
      .post('http://localhost:8000/api/v2/restaurantes/', {
        nome: restaurante
      })
      .then(() => {
        console.log('O nome do restaurante')
        console.log(restaurante)
        alert('Restaurante cadastrado com sucesso!')
      })
  }

  return (
    <form onSubmit={salvarNovoRestaurante}>
      <TextField
        label="Novo Restaurante"
        onChange={e => setRestaurante(e.target.value)}
        variant="outlined"
      />
      <Button type="submit" value={restaurante} variant="contained">
        Salvar
      </Button>
    </form>
  )
}

export default FormRestaurante
