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

  // creates an artist profile
  // !!! add biography and a link to wikipedia page. 
  // --> can't because those don't exist for the artists, just the artworks. would need a different api
  const buildArtists = (objects) => {
    const artistMap = {};

    objects.forEach(object => {
      const name = object.artistDisplayName;

      if (!name) return;
      if (!artistMap[name]) {
        artistMap[name] = {
          name,
          nationality: object.artistNationality,
          beginDate: object.artistBeginDate,
          endDate: object.artistEndDate,
          artworks: []
        }
      }

      artistMap[name].artworks.push(object)
    });

    return Object.values(artistMap)
  }

  // build helper function to build artwork profile
  
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/contactpage' element={<ContactPage />} />
      <Route path='/search' element={<SearchResultsPage buildArtists={buildArtists} />} />
      <Route path='/artists' element={<ArtistsPage />} />
      <Route path='/artworks' element={<ArtworksPage />} />

      <Route path='/artist/:artistName' element={<ArtistBioPage buildArtists={buildArtists} />} />
      <Route path='/artwork/:artworkName' element={<ArtworkBioPage />} />
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
