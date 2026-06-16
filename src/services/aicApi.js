import settings from "../settings";

export async function getArtistProfile(name) {

  fetch(`${settings.aic.baseurl}/search?q=${name}`)
  .then((r) => {
    if (!r.ok) {throw new Error("Failed to fetch.")}
    return r.json()
  })
  .then((data) => {
    console.log(data)
  })
  .then(results => {
    console.log(results)
    return results
  })
  .catch(console.error)
}