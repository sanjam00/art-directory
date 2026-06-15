import { useLocation, useParams } from "react-router-dom"
import settings from "../settings";
import { useEffect, useState } from "react";

export default function ArtistPage({ buildArtists }) {

  const location = useLocation();
  const artist = location.state?.artist;

  if (!artist) {
    return <p>Loading artist information ...</p>;
  }

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>{artist.nationality}</p>
      <p>{artist.beginDate} - {artist.endDate}</p>
      
      <h2>Highlighted Works</h2>

      {artist.artworks.map(work => (
        <div key={work.objectID}>
          <img src={work.primaryImageSmall} />
          <p>{work.title}</p>
          <p>{work.objectDate}</p>
        </div>
      ))}

    </div>
  )
}