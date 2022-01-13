import React, { useCallback } from 'react';

const FilterCheckbox = ({ isShortChecked, setIsShortChecked }) => {

  const handleChecked = useCallback(() => {
    setIsShortChecked(!isShortChecked);
    console.log('hi');
  }, [isShortChecked, setIsShortChecked])

  return (
    <div className="checkbox">
      <label className="checkbox__name" htmlFor="checkbox">Короткометражки</label>
      <input type="checkbox" onChange={handleChecked} checked={isShortChecked} id="checkbox" className="checkbox__image" />
    </div>
  )
};

export default FilterCheckbox;
