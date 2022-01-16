import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import './App.css'
import Header from './components/Header'
import AnimePage from './pages/AnimePage'
import Homepage from './pages/Homepage'
import ErrorPage from './pages/ErrorPage'

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
    <HashRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/anime/:id' element={<AnimePage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
