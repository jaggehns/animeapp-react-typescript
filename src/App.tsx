import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import './App.css'
import Header from './components/Header'
import AnimePage from './pages/AnimePage'
import Homepage from './pages/Homepage'

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh',
    },
  }))

  const classes = useStyles()
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/animeapp-react-typescript' />} />
          <Route path='/animeapp-react-typescript' element={<Homepage />} />
          <Route path='/animeapp-react-typescript/anime/:id' element={<AnimePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
