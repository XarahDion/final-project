import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Header from "./Header";
import City from "./City"
import Profile from "./Profile";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";

const App = () => {
  
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/cities/:city/:country"} element={<City />} />
          <Route path={"/profile"} element={<Profile/>} />
          <Route path={"/error"} element={<ErrorPage/>} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
`;

export default App;
