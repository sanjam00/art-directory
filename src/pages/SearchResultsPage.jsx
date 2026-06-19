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
      // setArtists(data.data)
      const artistsData = data.data || [];
      const ids = artistsData.map((artist) => artist.id);

      return Promise.all(
        ids.map((id) =>
          fetch(`${settings.aic.baseurl}/agents/${id}`)
          .then((r) => {
            if (!r.ok) { throw new Error("Failed to fetch.") }
            return r.json()
          })
        )
      )
    })
    .then((results) => {
      const detailedArtists = results.map(
        result => result.data
      );

      setArtists(detailedArtists);
    })
    .catch(console.error)
  }, [query])

  const artistPageNavigate = (artist) => {
    navigate(`/artist/${artist.id}`);
  }

  const artworkPageNavigate = (artwork) => {
    navigate(`/artwork/${artwork.objectID}`)
  }

  return(
    <div className="searchResults">
      <div className="resultsHeader" >
        <h2 style={{padding: '1em'}}>Results for "{query}"</h2>

        <div className="tabs">
          <button onClick={() => setActiveTab("artists")}>
            Artists
          </button>
          <button onClick={()=> setActiveTab("artworks")}>
            Artworks
          </button>
        </div>
      </div>

      <div className="artistContainer">
        {/* add dates alive */}
        {activeTab === "artists" && 
        artists.map(artist => (
          <div key={artist.id} className="artistCard" >
            <h3 onClick={() => artistPageNavigate(artist)}>{artist.title}</h3>
            {(artist.birth_date || artist.death_date) && (
              <p>{artist.birth_date} - {artist.death_date}</p>
            )}
          </div>
        ))
      }
      </div>

      <div className="artworkContainer">
        {/* add navigation link (visual on hover) when click on artist name */}
        {activeTab === "artworks" &&
          objects.map(object => (
            <div key={object.objectID} className="artworkCard" onClick={() => artworkPageNavigate(object)}>
              <img src={object.primaryImageSmall ? object.primaryImageSmall : ""}
                alt={object.title || "Artwork image"} />

              <div className="artwork-meta">
                <div className="meta-top">
                  <h3 className="artwork-title">{object.title}</h3>
                  <span className="object-date">{object.objectDate}</span>
                </div>

                <div className="artist-name">{object.artistDisplayName}</div>
              </div>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}