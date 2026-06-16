import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"
import settings from "../settings";

export default function SearchResultsPage({ buildArtists }){
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [objects, setObjects] = useState([]);
  const [artists, setArtists] = useState([]);

  const [activeTab, setActiveTab] = useState("artists");
  
  const navigate = useNavigate();

  // fetch artwork list
  useEffect(() => {
    if (!query) return;

    fetch(`${settings.met.baseurl}/search?q=${query}`)
    .then(r => {
      if (!r.ok) {throw new Error("Failed to fetch")}
      return r.json();
    })
    .then(data => {
      console.log("Artwork objectIDs from Met API: ", data)
      const ids = data.objectIDs.slice(0, 10) || [];

      // must use second fetch bc first returns only objectIDs
      return Promise.all(
        ids.map(id =>
          fetch(`${settings.met.baseurl}/objects/${id}`)
          .then(r => {
            if (!r.ok) { throw new Error("Failed to fetch") }
            return r.json();
          })
        )
      )
    })
    .then((results) => {
      console.log("Artwork details: ", results)

      // store artwork results in state
      setObjects(results);

      // don't need anymore bc using aic api for artist profiles
      // pass data into func to build artist data object
      // const artistData = buildArtists(results);
      // setArtists(artistData);
    })
    .catch(console.error)
  }, [query])

  // fetch artist list
  useEffect(() => {
    fetch(`${settings.aic.baseurl}/agents/search?q=${query}`)
    .then((r) => {
      if (!r.ok) { throw new Error("Failed to fetch.") }
      return r.json()
    })
    .then((data) => {
      console.log("Artist data from the AIC API: ", data)

      // store artist results in state
      setArtists(data.data)
    })
    .catch(console.error)
  }, [query])

  const artistPageNavigate = (artist) => {
    navigate(
      `/artist/${artist.id}`
    );
  }

  return(
    <div className="SearchResults">
      <h1>Results for "{query}"</h1>

      <div className="tabs">
        <button onClick={() => setActiveTab("artists")}>
          Artists
        </button>
        <button onClick={()=> setActiveTab("artworks")}>
          Artworks
        </button>
      </div>

      {activeTab === "artists" && 
        artists.map(artist => (
          <div key={artist.id} className="artistCard">
            <h3 onClick={() => artistPageNavigate(artist)}>{artist.title}</h3>
          </div>
        ))
      }

      {/* add navigation link when click on artist name */}
      {activeTab === "artworks" &&
        objects.map(object => (
          <div key={object.objectID} className="artworkCard">
            <img src={object.primaryImageSmall ? object.primaryImageSmall : "(No image available at this time)"} 
              alt="(No image available at this time)"/>
            <h3>{object.title}</h3>
            <p>{object.artistDisplayName}</p>
          </div>
        ))
      }

    </div>
  )
}