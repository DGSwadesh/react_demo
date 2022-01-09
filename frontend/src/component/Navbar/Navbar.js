// import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { FaPizzaSlice } from "react-icons/fa";

export const Nav = styled.nav`
  background: transparent;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 700px;
  padding: 10px
`;

export const NavLink = styled(Link)`
  color: #fff;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  font-weight: bold;

  @media screen and (max-width: 400px) {
    position: absolute;
    top: 10px;
    left: 25px;
  }
`;

export const NavIcon = styled.div`
  display: block;
  float: right;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: #fff;
  transform: translate(90%);
  p {
    // transform: translate(10px);
    font-style: italic;
    font-weight: bold;
  }
`;

export const Bars = styled(FaPizzaSlice)`
  font-size: 1.5rem;
  tranform: translate(-50%, 15%);
`;
