export const setCards = (cardsAfterSearch) => {
  return cardsAfterSearch = window.innerWidth > 768 ? 12
    : window.innerWidth > 480 ? 8 : 5;
};
