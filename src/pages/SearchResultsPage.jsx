import { useEffect, useState } from "react";
import { useSearchParams } from "react-router"
import settings from "../settings";

export default function SearchResultsPage(){
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [objects, setObjects] = useState([]);
  const [artists, setArtists] = useState([]);

  const [activeTab, setActiveTab] = useState("artists");

  useEffect(() => {
    if (!query) return;

    fetch(`${settings.met.baseurl}/search?q=${query}`)
    .then(r => {
      if (!r.ok) {throw new Error("Failed to fetch")}
      return r.json();
    })
    .then(data => {
      console.log(data)
      const ids = data.objectIDs.slice(0, 50) || [];

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

      const artistData = buildArtists(results);
      setArtists(artistData);
    })
    .catch(console.error)
  }, [query])

  // creates an artist profile
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
      
      {/* { activeTab === "all" && 
      objects.map((object) => (
        <div key={object.objectID}>
          <img src={object.primaryImage ? object.primaryImage : "(No image available at this time)"} 
            alt="(No image available at this time)" />
          <h3>{object.title}</h3>
          <p>{object.artistDisplayName}</p>
        </div>
      
      ))} */}

      {activeTab === "artists" && 
        artists.map(artist => (
          <div key={artist.name}>
            <h3>{artist.name}</h3>
          <p>{artist.nationality}</p>
          <p>{artist.beginDate} - {artist.endDate}</p>
          </div>
        ))
      }

      {activeTab === "artworks" &&
        objects.map(object => (
          <div key={object.objectID}>
            <img src={object.primaryImage ? object.primaryImage : "(No image available at this time)"} 
              alt="(No image available at this time)"/>
            <h3>{object.title}</h3>
            <p>{object.artistDisplayName}</p>
          </div>
        ))
      }

    </div>
  )
}