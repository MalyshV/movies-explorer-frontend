import { DESKTOP_WIDTH, MOBILE_WIDTH } from '../utils/constants';

export const renderCards = (cardsAfterSearch) => {
  return cardsAfterSearch = window.innerWidth > DESKTOP_WIDTH ? 12
    : window.innerWidth > MOBILE_WIDTH ? 8 : 5;
};
