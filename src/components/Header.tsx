import React, { FC } from 'react'
import {
  AppBar,
  Container,
  createTheme,
  Toolbar,
  Typography,
  ThemeProvider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}))

const Header: FC = () => {
  const classes = useStyles()

  const navigate = useNavigate()

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate('/')} className={classes.title} variant='h6'>
              Anime App
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
