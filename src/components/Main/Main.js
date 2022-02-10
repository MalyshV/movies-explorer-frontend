import React from "react";
import { AboutMe, AboutProject, Portfolio, Promo, Techs } from '../index';

const Main = () => {
  return (
    <div className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </div>
  )
};

export default Main;
