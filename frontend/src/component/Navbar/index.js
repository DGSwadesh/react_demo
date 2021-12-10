import React from "react";
import { Nav, NavLink, NavIcon, Bars } from "./Navbar";

function Navbar() {
  return (
    <>
      <Nav>
        <NavLink to="/">pizza</NavLink>
        <NavIcon>
          <p>Menu</p>
          <Bars />
        </NavIcon>
      </Nav>
    </>
  );
}

export default Navbar;
