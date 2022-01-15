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
    const popularAnimes = await axios.get(TopAnimes())

    setPopular(popularAnimes.data.data)
    console.log(popularAnimes.data.data)
  }

  useEffect(() => {
    fetchPopularAnimes()
  }, [])

  const items = popular.map(anime => {
    return (
      <>
        <Link key={anime.mal_id} className={classes.carouselItem} to={`anime/${anime.title}`}>
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            height='80'
            width='85'
            style={{ marginBottom: 10, borderRadius: '50%' }}
          />
          <span>{anime.title.substring(0, 22)}</span>
          &nbsp;
          <span>Rtg : {anime.score}</span>
        </Link>
      </>
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    512: {
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
