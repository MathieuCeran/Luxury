import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?term=${searchTerm}`);
  };

  return (
    <header>
      <Link to="/">
        <img
          src="https://cdn.discordapp.com/attachments/1165697898957262898/1175566155256176710/LUXURYLogo.png?ex=656bb24c&is=65593d4c&hm=a815e7bfc1f4ae6c8f77c6d1dab42ae817f89bdd227e678b14f9b9fef001718d&"
          alt=""
        />
      </Link>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Recherche..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchSubmit}>Rechercher</button>
      </div>
    </header>
  );
};

export default Header;
