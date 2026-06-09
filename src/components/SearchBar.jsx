import { useState } from "react"
import { useNavigate } from "react-router"

export default function SearchBar(){
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    navigate(`/search?q=${encodeURIComponent(inputText)}`);
  }

  return (
    <div className="SearchBar">

        <form onSubmit={handleSubmit}>
          <input placeholder="Placeholder text" 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)}/>
        </form>

    </div>
  )
}