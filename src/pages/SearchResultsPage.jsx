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

  useEffect(() => {
    if (!query) return;

    fetch(`${settings.met.baseurl}/search?q=${query}`)
    .then(r => {
      if (!r.ok) {throw new Error("Failed to fetch")}
      return r.json();
    })
    .then(data => {
      console.log(data)
      const ids = data.objectIDs.slice(0, 30) || [];

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
      console.log(results)
      setObjects(results);

      // pass data into func to build artist data object
      const artistData = buildArtists(results);
      setArtists(artistData);
    })
    .catch(console.error)
  }, [query])

  const artistPageNavigate = (artist) => {
    navigate(
      `/artist/${encodeURIComponent(artist.name)}`,
      {state: {artist}}
    );
  }

  return(
    <div className="SearchResults">
      <h1>Results for "{query}"</h1>

      <div className="tabs">
        {/* <button onClick={() => setActiveTab("all")}>
          All
        </button> */}
        <button onClick={() => setActiveTab("artists")}>
          Artists
        </button>
        <button onClick={()=> setActiveTab("artworks")}>
          Artworks
        </button>
      </div>

      {activeTab === "artists" && 
        artists.map(artist => (
          <div key={artist.name}>
            <h3 onClick={() => artistPageNavigate(artist)}>{artist.name}</h3>
            <p>{artist.nationality}</p>
            <p>{artist.beginDate} - {artist.endDate}</p>
          </div>
        ))
      }

      {/* add navigation link when click on artist name */}
      {activeTab === "artworks" &&
        objects.map(object => (
          <div key={object.objectID}>
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