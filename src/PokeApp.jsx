import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import {AppRouter} from './router/'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './store/store'

function PokeApp() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default PokeApp
