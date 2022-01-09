import React from "react";
import Navbar from "../Navbar";
import {
  HeroContainer,
  HeroContent,
  HeroItem,
  HeroBody,
} from "./heroElement";

const Hero = () => {
  return (
    <HeroContainer>
      <Navbar />
      <HeroContent>
        <HeroItem>
          {/* <HeroH1>Greatest Pizza ever</HeroH1> */}
          {/* <HeroP>30 second to go</HeroP> */}
          <HeroBody className="box1">1</HeroBody>
          <HeroBody className="box2">2</HeroBody>
          <HeroBody className="box3">3</HeroBody>
          <HeroBody className="box4">4</HeroBody>
        </HeroItem>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
