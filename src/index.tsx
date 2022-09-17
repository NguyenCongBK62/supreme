import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { StylesProvider } from '@mui/styles'
import { Provider } from 'react-redux'
import { store } from './store/index'

import App from './views/App'
import './assets/styles/app.scss';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
