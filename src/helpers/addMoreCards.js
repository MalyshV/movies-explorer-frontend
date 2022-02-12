import { DESKTOP_WIDTH, MOBILE_WIDTH } from '../utils/constants';

export const addMoreCards = (cardsPerRow) => {
  return cardsPerRow = window.innerWidth > DESKTOP_WIDTH ? 3
    : window.innerWidth > MOBILE_WIDTH ? 2 : 1
};
