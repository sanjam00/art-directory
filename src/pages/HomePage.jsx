import ArtistOTD from "../components/ArtistOTD";

export default function HomePage(){

  return (
    <>
      <h1>Welcome to ArtIndex</h1>
      <h4>How to use this website:</h4>
      <p>Get started by searching artist or artwork name. Click on a search result to navigate to the bio page for an artist or artwork! <br />Submit the form on the contact page to contact me directly. See below for the github link and a more technical description of how this app works.</p>
      
      <h4>About:</h4>
      <p>This search engine was built as a capstone project for a Junior Software Engineering course. It uses two APIs: one from the Met Museum and the other from the Art Institute of Chicago (AIC). It was necessary to use both becuase they each have their own specialties. The Met's API is very good at displaying information about a specific piece of art, but lacks information to build a profile for an artist- which is where the AIC's API comes in. This API has data pertaining to each artist, allowing me to create "biography pages" for both artists and artworks alike.</p> 
      <p>These are some features I hope to implement in the future:</p>
      <ul>
        <li>Advanced search</li>
        <li>Profiles to save artists and artworks, create collections</li>
        <li>Artist and Artwork landing pages to explore by alphabet or art movement</li>
        <li>Mobile CSS styles</li>
        <li>Fix bugs regarding highlighted works</li>
      </ul>
    <ArtistOTD />
    </>
  )
}