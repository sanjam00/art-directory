import { useState, useRef } from "react"
import { useNavigate } from "react-router"

export default function SearchBar(){
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    navigate(`/search?q=${encodeURIComponent(inputText)}`);

    setInputText('')
  }

  return (
    <div className="searchbar" onClick={() => inputRef.current && inputRef.current.focus()}>
      <form onSubmit={handleSubmit}>
        <input
          id="searchbarinput"
          ref={inputRef}
          placeholder="Search for artists and artworks"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} />
      </form>
    </div>
  )
}