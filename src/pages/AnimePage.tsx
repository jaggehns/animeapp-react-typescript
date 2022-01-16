import React, { FC, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { SingleAnime } from '../config/api'
import ISingleAnime from '../interfaces/ISingleAnime'
import axios from 'axios'
import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import ErrorPage from './ErrorPage'

const AnimePage: FC = () => {
  const { id } = useParams() as { id: string }
  const [anime, setAnime] = useState<ISingleAnime>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const navigate = useNavigate()

  const singleAnimeItem = async () => {
    setLoading(true)
    await axios
      .get(SingleAnime(id))
      .then(singleAnimeObj => {
        setAnime(singleAnimeObj.data)
        console.log(singleAnimeObj.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    singleAnimeItem()
  }, [])

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    main: {
      width: '50%',
      [theme.breakpoints.down('md')]: {
        width: '90%',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 25,
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 20,
      marginLeft: '20px',
      fontFamily: 'Montserrat',
    },
    description: {
      width: '100%',
      fontFamily: 'Montserrat',
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: 'justify',
    },
    marketData: {
      alignSelf: 'start',
      padding: 25,
      paddingTop: 10,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.down('xs')]: {
        alignItems: 'start',
      },
    },
  }))

  const classes = useStyles()

  if (error) return <ErrorPage />

  return loading ? (
    <LinearProgress style={{ backgroundColor: 'gold' }} />
  ) : (
    <div className={classes.container}>
      <div className={classes.main}>
        <img src={anime?.image_url} alt={anime?.title} style={{ marginBottom: 20 }} />
        <Typography variant='h3' className={classes.heading}>
          {anime?.title}
        </Typography>
        <Typography variant='subtitle1' className={classes.description}>
          {anime?.synopsis}
        </Typography>
        <div className={classes.marketData}>
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h5' className={classes.heading}>
              Score: {anime?.score}
            </Typography>
            <Typography variant='h5' className={classes.heading}>
              Premiered: {anime?.premiered}
            </Typography>
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flexEnd', width: '100%' }}>
          <Button
            onClick={() => navigate(-1)}
            style={{
              borderRadius: 35,
              backgroundColor: 'gold',
              padding: '18px 36px',
              marginBottom: '20px',
              fontSize: '18px',
              color: 'black',
              fontWeight: 'bold',
              marginLeft: '20px',
            }}
            variant='contained'
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AnimePage
