export const addMoreCards = (cardsPerRow) => {
  return cardsPerRow = window.innerWidth > 768 ? 3
    : window.innerWidth > 480 ? 2 : 1
};
