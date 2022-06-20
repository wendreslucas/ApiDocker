import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'
import IRestaurante from '../../interfaces/IRestaurante'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'
import { IPaginacao } from './../../interfaces/IPaginacao'
import IParametrosBusca from '../../interfaces/IParametrosBusca'

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')
  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('')

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios
      .get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(response => {
        setRestaurantes(response.data.results)
        setProximaPagina(response.data.next)
        setPaginaAnterior(response.data.previous)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const buscar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const opcoes = {
      params: {} as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao
    }

    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(response => {
        setRestaurantes(response.data.results)
        setProximaPagina(response.data.next)
        console.log(response.data.results)
      })
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina).then(response => {
      setRestaurantes([...restaurantes, ...response.data.results])
      setProximaPagina(response.data.next)
    })
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>

      <form onSubmit={buscar}>
        <div>
          <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
        </div>
        <div>
          <label htmlFor="select-ordenacao">Ordenação</label>
          <select
            name="select-ordenacao"
            id="select-ordenacao"
            value={ordenacao}
            onChange={evento => setOrdenacao(evento.target.value)}
          >
            <option value="">Padrão</option>
            <option value="id">Por ID</option>
            <option value="nome">Por Nome</option>
          </select>
        </div>
        <div>
          <button type="submit">buscar</button>
        </div>
      </form>
      {restaurantes?.map(item => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {/* {proximaPagina && <button onClick={verMais}>Ver Mais</button>} */}
      {
        <button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
          Pagina Anterior
        </button>
      }
      {
        <button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
          Proxima Pagina
        </button>
      }
    </section>
  )
}

export default ListaRestaurantes
