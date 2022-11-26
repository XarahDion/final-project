import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import Home from "./Home";
import Header from "./Header";
import City from "./City"
import { useState, useEffect } from "react";

const App = () => {
  
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/cities/:city/:country"} element={<City />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  position: fixed;
`;

export default App;
