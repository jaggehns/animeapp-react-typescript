import React, { FC } from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import image from '../../assets/images/banner.jpg'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${image})`,
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
  },
  header: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
}))

const Banner: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.header}>
          <Typography
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Montserrat',
            }}
          >
            Anime App
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Find all your favourite Animes here at Anime App
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner
