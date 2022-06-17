import axios from 'axios'
import { useEffect, useState } from 'react'
import IRestaurante from '../../interfaces/IRestaurante'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'
import { IPaginacao } from './../../interfaces/IPaginacao'

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const carregaDados = (url: string) => {
    axios
      .get<IPaginacao<IRestaurante>>(url)
      .then(response => {
        setRestaurantes(response.data.results)
        setProximaPagina(response.data.next)
        setPaginaAnterior(response.data.previous)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(response => {
        setRestaurantes(response.data.results)
        setProximaPagina(response.data.next)
        console.log(response.data.results)
      })
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
      {restaurantes?.map(item => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {/* {proximaPagina && <button onClick={verMais}>Ver Mais</button>} */}
      {
        <button onClick={() => carregaDados(paginaAnterior)} disabled={!paginaAnterior}>
          Pagina Anterior
        </button>
      }
      {
        <button onClick={() => carregaDados(proximaPagina)} disabled={!proximaPagina}>
          Proxima Pagina
        </button>
      }
    </section>
  )
}

export default ListaRestaurantes
