import { useEffect, useState } from "react";
import { useSearchParams } from "react-router"
import settings from "../settings";

export default function SearchResultsPage(){
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [objects, setObjects] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`${settings.met.baseurl}/search?q=${query}`)
    .then(r => {
      if (!r.ok) {throw new Error("Failed to fetch")}
      return r.json();
    })
    .then(data => {
      console.log(data)
      const ids = data.objectIDs.slice(0, 12) || [];

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
    })
    .catch(console.error)
  }, [query])

  return(
    <div className="SearchResults">
      <h1>Results for "{query}"</h1>

      {objects.map((object) => (
        <div key={object.objectID}>
          <h3>{object.title}</h3>
          <img src={object.primaryImageSmall} />
          <p>{object.artistDisplayName}</p>
        </div>

      ))}
    </div>
  )
}