import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ModalProvider, TodoProvider, UIProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UIProvider>
      <ModalProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </ModalProvider>
    </UIProvider>
  </React.StrictMode>,
)
