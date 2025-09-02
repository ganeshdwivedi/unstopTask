import { useState } from 'react'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <main className="p-10 bg-main-bg !min-h-screen relative">
        <Router />
      </main>
    </BrowserRouter>
  )
}

export default App
