import React from "react";
import Nav from '../Nav/Nav';
import NavMobile from '../NavMobile/NavMobile';

const Navigation = () => {
  return(
    <div className="nav">
      <Nav />
      <NavMobile />
    </div>
  )
};

export default Navigation;
