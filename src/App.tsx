import { makeStyles } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
          <Route path='/' element={<Homepage />} />
          <Route path='/anime/:id' element={<AnimePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
