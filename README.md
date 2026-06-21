# ArtIndex - Art Directory

## Description

A small React + Vite app that displays artworks and artist information using the Metropolitan Museum of Art (MET) and Art Institute of Chicago (AIC) public APIs. It provides search, artist and artwork profile pages, and an "Artwork/Artist of the Day" component.

**Features**
- **Search:** : Search for artists and artworks across MET and AIC.
- **Artwork Cards:** : Grid of artworks with images and basic metadata.
- **Artwork Detail:** : Dedicated artwork page with full metadata and image.
- **Artist Detail:** : Artist profile page with highlighted works.
- **Artist of the Day:** : Small component that surfaces a featured artist.
- **Artwork of the Day:** : Small component that surfaces a featured artwork.
- **Contact Page**: Contact form using external resource.

---

## Technologies Used

- React
- Vite
- React-router-dom
- React-router

---

## Installation Instructions

- **Prerequisites:** : Node.js (16+) and npm or yarn installed.
- **Install:**

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install dependencies
```bash
npm install
# or
yarn
```

---

## Run Instructions

### 1. Run (development)
```bash
npm run dev
# or
yarn dev
```

frontend will run on:
http://localhost:5173/


### 4. Build (production)
```bash
npm run build
# or
yarn build
```

---

## Configuration

- **API endpoints**: See src/settings.js — the app uses `settings.met.baseurl` and `settings.aic.baseurl` for API requests
- **Placeholder image:** : See src/settings.js - `settings.placeholder_img` for the default artwork image

See API documentation for more information:
- **MET API**: https://metmuseum.github.io/
- **AIC API**: https://api.artic.edu/docs/#introduction

---

## Project Structure
- **src:** : Application source
	- **components/** : Reusable components (ArtworkOTD, ArtworkOTD.css, ArtworkOTD.jsx, NavBar, SearchBar, etc.)
	- **pages/** : Route pages (HomePage, ArtistsPage, ArtworksPage, ArtworkBioPage, ArtistBioPage, SearchResultsPage)
	- **main.jsx / App.jsx** : App entry and routes

---

## Error handling

If a network request fails the app displays: "Failed to load resource. Please try again in a few minutes"

---

## Future Implementations

- Develop the Artists Page with alphabet index sorting.
- Devlop the Artworks Page with artworks grouped by time period and artistic movement.
- Implement advanced searching.
- Fix bugs with Artwork OTD and Artist OTD components.
- Navigation to an Artist Bio Page from an Artwork Bio Page
- Increase fetch size and implement pagination.
- Consider extracting a small `ArtworkImage` component to centralize placeholder and `onError` behavior.
- Add test suites.
- Hover over a placeholder image to reveal an "image coming soon" caption.
- Implement modularity and better use of custom hooks, services, and settings to follow DRY.

---

## License & Credits

This project was built as a capstone for the Flatiron School's Software Engineering course and uses public APIs from The Metropolitan Museum of Art and The Art Institute of Chicago.

### Author

Sanaeya James

