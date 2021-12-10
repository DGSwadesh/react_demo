import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/index";
import { GlobalStyle } from "./globalStyle";
import Hero from "./component/Hero/index";

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Hero />
      </Router>
    </>
  );
}

export default App;
