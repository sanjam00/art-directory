import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import settings from "../settings";
import './ArtworkBio.css'


export default function ArtworkBioPage(){
  const {artworkId} = useParams();
  const [artworkData, setArtworkData] = useState(null);
  const [error, setError] = useState(null);

  // const navigate = useNavigate();

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

  // const artistPageNavigate = (artist) => {
  //   navigate(`/artwork/${artist.objectID}`)
  // }
  
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
    <div className="artworkBioPage">
      <div className="artwork-container">
        <div className="artwork-image">
          <img
            src={artworkData.primaryImage || settings.placeholder_img}
            alt={artworkData.title || "Artwork image"}
            onError={(e) => { e.currentTarget.src = settings.placeholder_img; }}
          />
        </div>

        <div className="artwork-info">
          <div className="artwork-header">
            <h1 className="artwork-title">{artworkData.title}</h1>
            <p className="artwork-date">{artworkData.objectDate}</p>
            <div className="artist-info">
              <h2 className="artist-name" onClick={() => artworkPageNavigate}>{artworkData.artistDisplayName}</h2>
              <span className="artist-dash"> - </span>
              <p className="artist-nationality">{artworkData.artistNationality}</p>
            </div>
          </div>

          <hr className="artwork-divider" />

          <div className="artwork-specs">
            <h3>Artwork Specifications</h3>
            {artworkData.medium && <p><strong>Medium:</strong> {artworkData.medium}</p>}
            {artworkData.dimensions && <p><strong>Dimensions:</strong> {artworkData.dimensions}</p>}
            {artworkData.period && <p><strong>Period:</strong> {artworkData.period}</p>}
            {artworkData.dynasty && <p><strong>Dynasty:</strong> {artworkData.dynasty}</p>}
            {artworkData.objectWikidata_URL && (
              <p><a href={artworkData.objectWikidata_URL} target="_blank" rel="noopener noreferrer">View on Wikidata</a></p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}