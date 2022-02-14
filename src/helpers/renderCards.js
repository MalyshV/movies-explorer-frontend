import {
  DESKTOP_WIDTH,
  MOBILE_WIDTH,
  CARDS_PER_PAGE_DESKTOP,
  CARDS_PER_PAGE_LAPTOP,
  CARDS_PER_PAGE_MOBILE,
} from '../utils/constants';

export const renderCards = (cardsAfterSearch) => {
  return cardsAfterSearch = window.innerWidth > DESKTOP_WIDTH ? CARDS_PER_PAGE_DESKTOP
    : window.innerWidth > MOBILE_WIDTH ? CARDS_PER_PAGE_LAPTOP : CARDS_PER_PAGE_MOBILE;
};
