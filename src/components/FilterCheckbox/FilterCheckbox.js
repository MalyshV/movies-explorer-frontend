import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

const FilterCheckbox = ({ handleChecked, isChecked }) => {
  // const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="checkbox">
      <label className="checkbox__name" htmlFor="checkbox">Короткометражки</label>
      <input type="checkbox" onChange={handleChecked} checked={isChecked} id="checkbox" className="checkbox__image" />
    </div>
  )
};

export default FilterCheckbox;
