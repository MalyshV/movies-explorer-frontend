import React from "react";

const FilterCheckbox = () => {
  return (
    <div class="checkbox">
      <label className="checkbox__name" for="checkbox">Короткометражки</label>
      <input type="checkbox" id="checkbox" className="checkbox__image" />
    </div>
  )
};

export default FilterCheckbox;
