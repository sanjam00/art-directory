import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import ArtistPage from './pages/ArtistPage'
import HomePage from './pages/HomePage'
import ArtworkPage from './pages/ArtworkPage'
import NavBar from './components/NavBar'
import ContactPage from './pages/ContactPage'

function App() {
  return (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/artistpage' element={<ArtistPage />} />
      <Route path='/artworkpage' element={<ArtworkPage />} />
      <Route path='/contactpage' element={<ContactPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
