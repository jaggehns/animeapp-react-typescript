import axios from 'axios'
import React, { FC, useState, useEffect } from 'react'
import { LinearProgress, makeStyles, TextField } from '@material-ui/core'
import { AnimeList, AnimeSearch } from '../config/api'
import { IAnimeList } from '../interfaces/IAnimeList'
import AnimeCard from './AnimeCard'

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
}))

const AnimeTable: FC = () => {
  const [animeList, setAnimeList] = useState<IAnimeList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const classes = useStyles()

  const searchAnimes = async () => {
    setLoading(true)
    const searchQuery = search.toLowerCase()
    await axios
      .get(AnimeSearch(searchQuery))
      .then(animeList => {
        setAnimeList(animeList.data.results)
        console.log(animeList.data.results)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchAnimes = async () => {
    setLoading(true)
    await axios
      .get(AnimeList())
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
    fetchAnimes()
  }, [])

  useEffect(() => {
    let isApiSubscribed = true
    if (search?.length >= 3) {
      searchAnimes()
    } else if (search?.length === 0) {
      fetchAnimes()
    } else {
      console.log('Error')
    }

    return () => {
      isApiSubscribed = false
    }
  }, [search])

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
          placeholder='Search For an Anime...'
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
    </div>
  )
}

export default AnimeTable
