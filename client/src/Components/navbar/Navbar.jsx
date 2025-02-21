import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Short.ly</div>
      
        <div className="rightsection">
       <button onClick={()=>{
        window.open("https://portfolio-sigma-one-53.vercel.app/")
      }} className="btn-22"><span>About Me</span>
      </button>
      </div>
     
      </nav>
  );
}

export default Navbar;
