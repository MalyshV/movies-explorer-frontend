import {
  DESKTOP_WIDTH,
  MOBILE_WIDTH,
  CARDS_PER_ROW_DESKTOP,
  CARDS_PER_ROW_LAPTOP,
  CARDS_PER_ROW_MOBILE,
 } from '../utils/constants';

export const addMoreCards = (cardsPerRow) => {
  return cardsPerRow = window.innerWidth > DESKTOP_WIDTH ? CARDS_PER_ROW_DESKTOP
    : window.innerWidth > MOBILE_WIDTH ? CARDS_PER_ROW_LAPTOP : CARDS_PER_ROW_MOBILE
};
