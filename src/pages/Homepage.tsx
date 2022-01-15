import React, { FC } from 'react'
import AnimeTable from '../components/AnimeTable'
import Banner from '../components/Banner/Banner'

const Homepage: FC = () => {
  return (
    <>
      <Banner />
      <AnimeTable />
    </>
  )
}

export default Homepage
