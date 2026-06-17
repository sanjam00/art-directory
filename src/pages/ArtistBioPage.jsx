import { useParams } from "react-router-dom"
import settings from "../settings";
import { useEffect, useState } from "react";

export default function ArtistBioPage() {
  const {artistId} = useParams();
  const [artistData, setArtistData] = useState(null);
  const [error, setError] = useState(null);

  // fetch artist profile from aic api
  useEffect(() => {

    // guard the effect
    if (!artistId) return;

    fetch(`${settings.aic.baseurl}/agents/${artistId}`)
    .then((r) => {
      if (!r.ok) { throw new Error("Failed to fetch.") }
      return r.json()
    })
    .then((data) => {
      console.log("Artist data: ", data);
      setArtistData(data.data);
      setError(null);
    })
    .catch((error) => {
      console.error(error);
      setError("Failed to load artist details");
    })
  }, [artistId])
  
  if (error) {
    return <p>{error}</p>
  }
  
  // doesn't work. if api fails, this stays on the screen. implement better error handling
  if (!artistId) {
    return <p>Loading artist information ...</p>;
  }
  if (!artistData) {
    return <p>Loading artist details ...</p>
  }
  
  // fetch artworks for that artist => Highlighted Works

  return (
    <div>
      {/* // first half will be from AIC api: the name, date, portrait, bio, etc. */}
      <h1>{artistData.title}</h1>
      {/* <p>{artist.nationality}</p> */}
      <p>{artistData.birth_date} - {artistData.death_date}</p>
      <div className="artist-description">
        <div dangerouslySetInnerHTML={{
          __html: artistData.description
        }} />
      </div>
      
      {/* // second half (highlighted works) will be from Met api */}
      <h2>Highlighted Works</h2>

      {/* {artist.artworks.map(work => (
        <div key={work.objectID}>
          <img src={work.primaryImageSmall} />
          <p>{work.title}</p>
          <p>{work.objectDate}</p>
        </div>
      ))} */}

    </div>
  )
}