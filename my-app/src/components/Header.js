import React from "react";
import StyleIcon from '@mui/icons-material/Style';

function Header() {
  return (
    <header className="nav-bar">
      <a href="/"><h1><StyleIcon fontSize="large"/> FLASH</h1></a>
    </header>
  );
}

export default Header;
