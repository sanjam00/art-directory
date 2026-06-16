import { useEffect, useState } from "react";
import { useParams } from "react-router";
import settings from "../settings";

export default function ArtworkBioPage(){
  const {artworkId} = useParams();
  const [artworkData, setArtworkData] = useState(null);
  const [error, setError] = useState(null);

  // fetch artwork profile from met api
  useEffect(() => {
    if (!artworkId) return;

    fetch(`${settings.met.baseurl}/objects/${artworkId}`)
    .then((r) => {
      if (!r.ok) { throw new Error("Failed to fetch.") }
      return r.json()
    })
    .then((data) => {
      console.log("Artwork data: ", data);
      setArtworkData(data);
      setError(null);
    })
    .catch((error) => {
      console.error(error);
      setError("Failed to load artist details");
    })
  }, [artworkId])
  
  if (error) {
    return <p>{error}</p>
  }
  if (!artworkId) {
    return <p>Loading artist information ...</p>;
  }
  if (!artworkData) {
    return <p>Loading artist details ...</p>
  }

  return (
    <div>
      {/* what to do if there's no primary images? */}
      <img src={artworkData.primaryImage} />
      <h1>{artworkData.title}</h1>
      <h3>{artworkData.objectDate}</h3>
      <h4>{artworkData.medium}</h4>
      <h4>{artworkData.dimensions}</h4>
      <h4>{artworkData.objectWikidata_URL}</h4>
      <h4>{artworkData.period}</h4>
      <h4>{artworkData.dynasty}</h4>

      {/* add link to artist profile onClick */}
      <h2>{artworkData.artistDisplayName}</h2> 
      <h3>{artworkData.artistNationality}</h3>
    </div>
  )
}