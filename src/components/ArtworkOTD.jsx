import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import settings from "../settings";
import "./ArtworkOTD.css";

export default function ArtworkOTD() {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtworkOfTheDay = async () => {
      try {
        const listRes = await fetch(`${settings.met.baseurl}/objects`);
        if (!listRes.ok) throw new Error("Failed to fetch artwork list");
        const listData = await listRes.json();
        const ids = listData.objectIDs || [];
        if (!ids.length) throw new Error("No artwork IDs returned");

        const today = new Date().toISOString().slice(0, 10);
        const seed = Array.from(today).reduce((hash, char) => {
          return ((hash << 5) - hash) + char.charCodeAt(0);
        }, 0);
        const startIndex = Math.abs(seed) % ids.length;

        let chosenArtwork = null;
        for (let offset = 0; offset < 6; offset += 1) {
          const candidateIndex = (startIndex + offset) % ids.length;
          const objectId = ids[candidateIndex];
          const detailRes = await fetch(`${settings.met.baseurl}/objects/${objectId}`);
          if (!detailRes.ok) continue;

          const detail = await detailRes.json();
          if (detail && (detail.primaryImageSmall || detail.primaryImage)) {
            chosenArtwork = detail;
            break;
          }
          if (offset === 5) {
            chosenArtwork = detail;
          }
        }

        if (!chosenArtwork) throw new Error("Failed to load artwork details");
        setArtwork(chosenArtwork);
        setError(null);
      } catch (err) {
        console.error("Error fetching artwork of the day:", err);
        setError("Failed to load artwork of the day");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworkOfTheDay();
  }, []);

  const handleArtworkClick = () => {
    if (artwork) {
      navigate(`/artwork/${artwork.objectID}`);
    }
  };

  if (loading) return <div className="artwork-otd"><p>Loading artwork of the day...</p></div>;
  if (error) return <div className="artwork-otd"><p>{error}</p></div>;
  if (!artwork) return <div className="artwork-otd"><p>No artwork available</p></div>;

  return (
    <div className="artwork-otd">
      <div className="artwork-otd-header">
        <h3>Artwork of the Day</h3>
      </div>
      <div className="artwork-otd-card" onClick={handleArtworkClick}>
        {artwork.primaryImageSmall || artwork.primaryImage ? (
          <img
            className="artwork-otd-image"
            src={artwork.primaryImageSmall || artwork.primaryImage}
            alt={artwork.title}
          />
        ) : null}
        <div className="artwork-otd-content">
          <h4>{artwork.title || "Untitled"}</h4>
          <div className="artwork-otd-meta">
            <p className="artwork-otd-artist">{artwork.artistDisplayName || "Unknown Artist"}</p>
            {artwork.objectDate && <p className="artwork-otd-date">{artwork.objectDate}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
