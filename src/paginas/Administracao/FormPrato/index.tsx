import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';
import api from '../../../services/api';

const FormPrato: React.FC = () => {
  const parametros = useParams();
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');

  const [tag, setTag] = useState('');
  const [restaurante, setRestaurante] = useState('');

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    api
      .get<{ tags: ITag[] }>('tags/')
      .then((response) => setTags(response.data.tags));

    api
      .get<IRestaurante[]>('restaurantes/')
      .then((response) => setRestaurantes(response.data));
  }, []);

  const salvarNovoPrato = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);

    if (imagem) {
      formData.append('imagem', imagem);
    }

    api
      .request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
      .then(() => {
        setNomePrato('');
        setDescricao('');
        setTag('');
        setRestaurante('');
        alert('Prato adicionado com sucesso!');
      })
      .catch((erro) => console.log(erro));
  };

  const adicionarImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImagem(e.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h6">
              Formulário de Pratos
            </Typography>
            <Box
              component="form"
              onSubmit={salvarNovoPrato}
              sx={{ width: '50%' }}
            >
              <TextField
                fullWidth
                label="Novo Prato"
                margin="dense"
                onChange={(e) => setNomePrato(e.target.value)}
                required
                value={nomePrato}
                variant="standard"
              />

              <TextField
                fullWidth
                label="Descrição"
                margin="dense"
                onChange={(e) => setDescricao(e.target.value)}
                required
                value={descricao}
                variant="standard"
              />

              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-tag">TAG</InputLabel>
                <Select
                  labelId="select-tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.value}>
                      {tag.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-restaurante">RESTAURANTES</InputLabel>
                <Select
                  labelId="select-restaurante"
                  value={restaurante}
                  onChange={(e) => setRestaurante(e.target.value)}
                >
                  {restaurantes.map((restaurante) => (
                    <MenuItem key={restaurante.id} value={restaurante.id}>
                      {restaurante.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <input type="file" onChange={adicionarImagem} />

              <Button
                fullWidth
                sx={{ marginTop: 1 }}
                type="submit"
                variant="outlined"
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FormPrato;
