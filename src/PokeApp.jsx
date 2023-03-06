import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import {AppRouter} from './router/'
import { Provider } from 'react-redux'
import { store } from './store'

function PokeApp() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}

export default PokeApp
