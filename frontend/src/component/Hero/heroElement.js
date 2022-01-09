import styled from "styled-components";
import ImgBg from "../../images/img-1.jpg";

export const HeroContainer = styled.div`
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${ImgBg});
  height: 100vh;
  background-positioned: center;
  background-size: cover;
`;

export const HeroContent = styled.div`
  /* height: cal(100vh - 80vh); */
  /* max-height: 100%; */
  width: 100vw;
  padding: 0rem clac((100vw - 1300px) / 2);
  background: red;
`;

export const HeroItem = styled.div`
  /* display: flex; */
  border: 2px solid green;
  padding: 80px;
`;

// export const HeroH1 = styled.div`
//   color: white;
// `;

export const HeroBody = styled.div`
  background: blue;
  border: 2px solid green;
  margin: 2px;
  display: inline-block;
  height: 50px;
  width: 50px;

  &.box2 {
    /* position: absolute; */
    /* position: relative; */
    top: 30px;
    background: yellow;
  }
`;
