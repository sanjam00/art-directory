import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ArtistPage from './pages/ArtistPage'
import HomePage from './pages/HomePage'
import ArtworkPage from './pages/ArtworkPage'
import NavBar from './components/NavBar'
import ContactPage from './pages/ContactPage'
import SearchResultsPage from './pages/SearchResultsPage'

function App() {

  
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path='/artistpage' element={<ArtistPage />} /> */}
      {/* <Route path='/artworkpage' element={<ArtworkPage />} /> */}
      <Route path='/contactpage' element={<ContactPage />} />
      <Route path='/search' element={<SearchResultsPage />} />
      <Route path='/artist/:artistName' element={<ArtistPage />} />
      <Route path='/artwork/:artworkName' element={<ArtworkPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App



// fetch all object id's
// useEffect(() => {
//   fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects")
//   .then(r => {
//     if (!r.ok) { throw new Error("Failed to fetch")}
//     return r.json();
//   })
//   .then(data => {
//     console.log(data)
//     // set state and display data
//   })
//   .catch(error => console.log("Fetch request failed:", error))
// }, [])
