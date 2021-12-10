import styled from "styled-components";
import ImgBg from "../../../assets/img/hero/hero-bg.png";

export const HeroElement = styled.div`
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.image});
`;
