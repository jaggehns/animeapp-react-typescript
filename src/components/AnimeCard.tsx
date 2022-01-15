import React, { FC } from 'react'
import { Badge } from '@material-ui/core'
import { IAnimeList } from '../interfaces/IAnimeList'
import { Link } from 'react-router-dom'

interface Props {
  anime: IAnimeList
}

const AnimeCard: FC<Props> = ({ anime }) => {
  return (
    <>
      <Link to={`/anime/${anime.mal_id}`}>
        <div className='media'>
          <Badge badgeContent={anime.score} color={anime.score > 6 ? 'primary' : 'secondary'} />
          <img className='poster' src={anime.image_url} alt={anime.title} height={300} />
          <b className='title'>
            {anime.title.length > 15 ? `${anime.title.substring(0, 10)}...` : anime.title}
          </b>
          <span className='subTitle'>
            {anime.type}
            <span className='subTitle'>{anime.start_date}</span>
          </span>
        </div>
      </Link>
    </>
  )
}

export default AnimeCard
