import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ArtistBioPage from './pages/ArtistBioPage'
import HomePage from './pages/HomePage'
import ArtworksPage from './pages/ArtworksPage'
import ArtworkBioPage from './pages/ArtworkBioPage'
import NavBar from './components/NavBar'
import ContactPage from './pages/ContactPage'
import SearchResultsPage from './pages/SearchResultsPage'
import ArtistsPage from './pages/ArtistsPage'

function App() {
  
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/contactpage' element={<ContactPage />} />
      <Route path='/search' element={<SearchResultsPage />} />
      <Route path='/artists' element={<ArtistsPage />} />
      <Route path='/artworks' element={<ArtworksPage />} />

      <Route path='/artist/:artistId' element={<ArtistBioPage />} />
      <Route path='/artwork/:artworkId' element={<ArtworkBioPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
