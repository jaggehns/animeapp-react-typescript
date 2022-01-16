import axios from 'axios'
import React, { FC, useState, useEffect } from 'react'
import { LinearProgress, makeStyles, TextField } from '@material-ui/core'
import { AnimeList, AnimeSearch } from '../config/api'
import { IAnimeList } from '../interfaces/IAnimeList'
import AnimeCard from './AnimeCard'
import { Pagination } from '@material-ui/lab'
const debounce = require('lodash.debounce')

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
  const [error, setError] = useState<boolean>(false)

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
        setError(true)
        setLoading(false)
      })
  }

  const handleChange = (page: number): void => {
    setPage(page)
  }

  const fetchAnimes = async () => {
    console.log('Hello')
    setLoading(true)

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
        setError(true)
        setLoading(false)
      })
  }

  //useEffect for initial render and when searchbar empty
  useEffect(() => {
    if (!search) {
      fetchAnimes()
    }
  }, [page])

  //useEffect for searchQueries
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

  const handleSearch = (searchQuery: string) => {
    setSearch(searchQuery)
  }

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e?.target?.value)

  //debouncing API calls(250ms)
  const debouncedOnChange = debounce(updateQuery, 250)

  return (
    <div className='animeTableWrapper'>
      <div className={classes.textFieldWrapper}>
        <TextField
          className={classes.root}
          variant='filled'
          placeholder='Search For an Anime... (min 3 char)'
          style={{ width: '100%' }}
          InputProps={{ classes: { input: classes.input } }}
          onChange={debouncedOnChange}
        />
      </div>
      {loading ? (
        <LinearProgress style={{ backgroundColor: 'gold' }} />
      ) : !loading && !error ? (
        <div className='movieWrapper'>
          {animeList.map(anime => {
            return <AnimeCard key={anime.mal_id} anime={anime} />
          })}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 style={{ color: 'white' }}>
            Sorry, we have run into an issue. This could be an api limitation
          </h1>
        </div>
      )}
      <Pagination
        variant='outlined'
        /* eslint-disable  @typescript-eslint/no-explicit-any */
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
