import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import settings from "../settings";
import "./ArtistOTD.css";

export default function ArtistOTD() {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch a random artist from the AIC API
    const fetchRandomArtist = async () => {
      try {
        // First, get the total count of agents
        const countRes = await fetch(`${settings.aic.baseurl}/agents?limit=1`);
        if (!countRes.ok) throw new Error("Failed to fetch artist count");
        const countData = await countRes.json();
        const totalArtists = countData.pagination?.total || 1000;

        // Generate a random offset
        const randomOffset = Math.floor(Math.random() * Math.max(1, totalArtists - 1));

        // Fetch a single artist at that offset
        const artistRes = await fetch(
          `${settings.aic.baseurl}/agents?limit=1&offset=${randomOffset}`
        );
        if (!artistRes.ok) throw new Error("Failed to fetch artist");
        const artistData = await artistRes.json();

        if (artistData.data && artistData.data.length > 0) {
          setArtist(artistData.data[0]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching random artist:", err);
        setError("Failed to load artist of the day");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomArtist();
  }, []);

  const handleArtistClick = () => {
    if (artist) {
      navigate(`/artist/${artist.id}`);
    }
  };

  if (loading) return <div className="artist-otd"><p>Loading artist of the day...</p></div>;
  if (error) return <div className="artist-otd"><p>{error}</p></div>;
  if (!artist) return <div className="artist-otd"><p>No artist available</p></div>;

  return (
    <div className="artist-otd">
      <div className="artist-otd-header">
        <h3>Artist of the Day</h3>
      </div>
      <div className="artist-otd-card" onClick={handleArtistClick}>
        <div className="artist-otd-content">
          <h4>{artist.title}</h4>
          {(artist.birth_date || artist.death_date) && (
            <p className="artist-otd-dates">
              {artist.birth_date} - {artist.death_date}
            </p>
          )}
          {artist.nationality && (
            <p className="artist-otd-nationality">{artist.nationality}</p>
          )}
        </div>
      </div>
    </div>
  );
}
