import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { ChakraProvider} from '@chakra-ui/react'
import { theme } from './theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <Provider store={store} >
        <App />
    </Provider>
    </ChakraProvider>
  </React.StrictMode>,
)
