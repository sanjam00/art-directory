import { useParams } from "react-router"
import settings from "../settings";

export default function ArtworkPage(){

  const { artistName } = useParams();

  fetch(
    `${settings.met.baseurl}/search?q=${artistName}&artistOrCulture=true`
  )

  return(
    <>
      <h2></h2>
    </>
  )
}