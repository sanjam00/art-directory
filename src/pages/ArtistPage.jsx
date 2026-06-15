import { useParams } from "react-router-dom"
import settings from "../settings";
import { useEffect, useState } from "react";

export default function ArtistPage({ buildArtists }) {
  const [artist, setArtist] = useState(null);
  const { artistName } = useParams();

  useEffect(() => {
    fetch(`${settings.met.baseurl}/search?q=${encodeURIComponent(artistName)}&artistOrCulture=true`)
      .then((r) => {
        if (!r.ok) {throw new Error("Failed to fetch");}
        return r.json();
      })
      .then((data) => {
        console.log(data)

        const ids = data.objectIDs?.slice(0, 5) || []

        // must use second fetch bc first returns only objectIDs
        return Promise.all(
          ids.map(id => 
            fetch(`${settings.met.baseurl}/objects/${id}`)
            .then(r => {
              if (!r.ok) { throw new Error("Failed to fetch") }
              return r.json()
            })
          )
        );
        console.log("ids:", ids);
      })
      .then((results) => {
        console.log(results)

        const artistData = buildArtists(results);
        console.log(artistData);

        // use first artist and store that in state
        setArtist(artistData[0]);

        console.log("artistName:", artistName);
        console.log("results:", results);
        console.log("artistData:", artistData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [artistName]);

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
        {work.title}
        {work.objectDate}
        </div>
      ))}

    </div>
  )
}


{/* <h1>This is the Artist Page</h1>
<p>Here, view the directory of artists that will be listed alphabetically by last name, or search for an artist.</p>
<p>When you click on an artist, it should take you to the individual artist page, which will inclue synopsis, years livedm, country of origin, a photo (if available), a list of works, and possibly selected works</p> */}