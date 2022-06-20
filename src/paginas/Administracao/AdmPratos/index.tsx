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

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IPrato from '../../../interfaces/IPrato'
import api from '../../../services/api'

const AdministracaoPratos: React.FC = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    api.get<IPrato[]>('/pratos/').then(response => {
      setPratos(response.data)
    })
  }, [])

  const excluir = (pratoASerExcluido: IPrato) => {
    api.delete(`/pratos/${pratoASerExcluido.id}/`).then(() => {
      const listaPrato = pratos.filter(prato => prato.id !== pratoASerExcluido.id)
      setPratos([...listaPrato])
      alert(`${pratoASerExcluido.nome} excluído com sucesso`)
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map(prato => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                <a href={prato.imagem} target="_blank" rel="noreferrer">
                  [ Ver ]
                </a>
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/pratos/${prato.id}`}> Editar </Link> ]
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
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

export default AdministracaoPratos
