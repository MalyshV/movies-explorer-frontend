import React, { useState } from "react";
import Nav from '../Nav/Nav';
import NavMobile from '../NavMobile/NavMobile';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return(
    <div className="nav">
      <Nav />
      { isLoggedIn && <NavMobile /> }
    </div>
  )
};

export default Navigation;
