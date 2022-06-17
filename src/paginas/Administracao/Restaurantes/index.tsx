import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'

const AdministracaoRestaurantes: React.FC = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/').then(response => {
      setRestaurantes(response.data)
    })
  }, [])

  const excluir = (restauranteASerExcluido: IRestaurante) => {
    axios
      .delete(`http://localhost:8000/api/v2/restaurantes/${restauranteASerExcluido.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(
          restaurante => restaurante.id !== restauranteASerExcluido.id
        )
        setRestaurantes([...listaRestaurante])
        alert(`${restauranteASerExcluido.nome} excluído com sucesso`)
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [ <Link to={`/admin/restaurantes/${restaurante.id}`}> Editar </Link> ]
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes
