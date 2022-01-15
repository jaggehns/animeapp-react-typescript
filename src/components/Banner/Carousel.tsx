import React, { FC, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import IPopularAnimes from '../../interfaces/IPopularAnimes'
import axios from 'axios'
import { TopAnimes } from '../../config/api'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

/* eslint-disable @typescript-eslint/no-unused-vars */
const useStyles = makeStyles(theme => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
  },
}))

const Carousel: FC = () => {
  const [popular, setPopular] = useState<IPopularAnimes[]>([])
  const classes = useStyles()

  const fetchPopularAnimes = async () => {
    await axios
      .get(TopAnimes())
      .then(popularAnimes => {
        setPopular(popularAnimes.data.top)
        console.log(popularAnimes.data.top)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchPopularAnimes()
  }, [])

  const items = popular.slice(0, 10).map(anime => {
    return (
      <>
        <Link key={anime.mal_id} className={classes.carouselItem} to={`/anime/${anime.mal_id}`}>
          <img
            src={anime.image_url}
            alt={anime.title}
            height='120'
            width='120'
            style={{ marginBottom: 10, borderRadius: '50%' }}
          />
          <span style={{ color: 'gold' }}>
            {anime.title.length > 20 ? `${anime.title.substring(0, 15)}...` : anime.title}
          </span>
          <span style={{ color: 'green', fontWeight: 500 }}>RTG : {anime.score}</span>
        </Link>
      </>
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    720: {
      items: 4,
    },
  }

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  )
}

export default Carousel
