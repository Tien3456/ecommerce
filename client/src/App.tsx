import React, { useEffect } from 'react'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'
import GlobalContext from './GlobalContext'
import RouteComponents from './routes/RouteComponents'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { useLocation } from 'react-router-dom'

const App = () => {

  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className="App">
      <ThemeProvider theme={ theme }>
        <Provider store={ store }>
          <GlobalContext>
            <RouteComponents />
          </GlobalContext>
        </Provider>
        <CssBaseline />
      </ThemeProvider>
    </div>
  )
}

export default App