import { useParams } from "react-router-dom"
import settings from "../settings";
import { useEffect, useState } from "react";

export default function ArtistBioPage() {
  const {artistId} = useParams();
  const [artistData, setArtistData] = useState(null);
  const [works, setWorks] = useState([]);
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

  // fetch artworks for that artist => Highlighted Works
  useEffect(() => {
    if (!artistData) return;

    fetch(`${settings.met.baseurl}/search?q=${encodeURIComponent(artistData.title)}`)
      .then((r) => {
        if (!r.ok) { throw new Error("Failed to fetch.") }
        return r.json()
      })
      .then(data => {
        console.log(data);
        const ids = data.objectIDs?.slice(0, 12) || [];

        // must use second fetch bc first returns only objectIDs
        return Promise.all(
          ids.map(id =>
            fetch(`${settings.met.baseurl}/objects/${id}`)
              .then(r => {
                if (!r.ok) { throw new Error("Failed to fetch") }
                return r.json();
              })
          )
        );
      })
      .then((results) => {
        console.log(results)
        const filteredWorks = results.filter(
          work =>
            work.artistDisplayName?.toLowerCase() === artistData.title.toLowerCase()
        )

        setWorks(filteredWorks)
      })
      .catch(console.error)
  }, [artistData])
  
  if (error) {
    return <p>{error}</p>
  }
  
  if (!artistId) {
    return <p>Loading artist information ...</p>;
  }
  if (!artistData) {
    return <p>Loading artist details ...</p>
  }
  
  // if (!works) {
  //   return <p>Loading artist details ...</p>
  // }

  return (
    <div>
      {/* // first half will be from AIC api: the name, date, portrait, bio, etc. */}
      <h1>{artistData.title}</h1>
      {/* <p>{artistData.nationality}</p> */}
      <p>{artistData.birth_date} - {artistData.death_date}</p>
      <div className="artist-description">
        <div dangerouslySetInnerHTML={{
          __html: artistData.description
        }} />
      </div>
      
      {/* // second half (highlighted works) will be from Met api */}
      <h2>Highlighted Works</h2>

      <div className="worksGrid">
        {works.map(work => (
          <div key={work.objectID} className="workCard">
            <img
              src={work.primaryImageSmall}
              alt={work.title}
            />
            <h3>{work.title}</h3>
            <p>{work.objectDate}</p>
          </div>
        ))}
      </div>

    </div>
  )
}