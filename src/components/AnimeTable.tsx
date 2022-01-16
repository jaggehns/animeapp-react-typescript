import axios from 'axios'
import React, { FC, useState, useEffect } from 'react'
import { LinearProgress, makeStyles, TextField } from '@material-ui/core'
import { AnimeList, AnimeSearch } from '../config/api'
import { IAnimeList } from '../interfaces/IAnimeList'
import AnimeCard from './AnimeCard'
import { Pagination } from '@material-ui/lab'

/* eslint-disable @typescript-eslint/no-unused-vars */
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiInputBase-root': {
      color: 'white', //or try theme.palette.primary.main
      backgroundColor: 'black', //It should be white by default
      margin: 20,
    },
  },
  textFieldWrapper: {
    padding: '20px 0',
    width: '50%',
  },
  input: {
    textAlign: 'center',
    '&::placeholder': {
      color: 'white',
      textAlign: 'center',
    },
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: 'gold',
      '&:hover': {
        backgroundColor: '#772e2e',
      },

      '&:focus': {
        backgroundColor: '#772e2e',
      },
    },
  },
}))

const AnimeTable: FC = () => {
  const [animeList, setAnimeList] = useState<IAnimeList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  const classes = useStyles()

  const searchAnimes = async () => {
    setLoading(true)
    const searchQuery = search.toLowerCase()
    const searchPage = page
    await axios
      .get(AnimeSearch(searchQuery, searchPage))
      .then(animeList => {
        setAnimeList(animeList.data.results)
        console.log(animeList.data.results)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleChange = (page: number): void => {
    setPage(page)
    window.scroll(0, 0)
  }

  const fetchAnimes = async () => {
    setLoading(true)
    if (!search || search.length === 0) {
      setPage(1)
    }
    const currentPage = page

    await axios
      .get(AnimeList(currentPage))
      .then(animeList => {
        setAnimeList(animeList.data.top)
        console.log(animeList.data.top)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (!search || search.length === 0) {
      setPage(1)
      fetchAnimes()
    }
  }, [page])

  useEffect(() => {
    let isApiSubscribed = true
    if (search?.length >= 3) {
      searchAnimes()
    } else if (search?.length === 0) {
      fetchAnimes()
    }

    return () => {
      isApiSubscribed = false
    }
  }, [search, page])

  // const handleChange = e => {
  //   setSearch(e)
  //
  // }
  return (
    <div className='animeTableWrapper'>
      <div className={classes.textFieldWrapper}>
        <TextField
          className={classes.root}
          variant='filled'
          placeholder='Search For an Anime... (min 3 char)'
          style={{ width: '100%' }}
          InputProps={{ classes: { input: classes.input } }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <LinearProgress style={{ backgroundColor: 'gold' }} />
      ) : (
        <div className='movieWrapper'>
          {animeList.map(anime => {
            return <AnimeCard key={anime.mal_id} anime={anime} />
          })}
        </div>
      )}
      <Pagination
        variant='outlined'
        onChange={(e: any) => handleChange(e.target.textContent)}
        style={{
          padding: 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        classes={{ ul: classes.pagination }}
        count={80}
      />
    </div>
  )
}

export default AnimeTable
