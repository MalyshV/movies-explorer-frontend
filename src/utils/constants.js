export const checkMovie = (card) => {
  const shortFilm = card.duration <= 40;
    if (shortFilm) {
      console.log('я - короткометражка');
    } else {
      console.log('а я - нет');
    }
};

export const checkMovieDuration = (duration) => {
  const result = duration <= 40 ? 'я - короткометражка' : 'а я - нет';
  console.log(result);
}

export const setCards = (cardsAfterSearch) => {
  return cardsAfterSearch = window.innerWidth > 768 ? 12
    : window.innerWidth > 480 ? 8 : 5;
};

export const addMoreCards = (cardsPerRow) => {
  return cardsPerRow = window.innerWidth > 768 ? 3
    : window.innerWidth > 480 ? 2 : 1
};

export const setRigthDuration = (duration) => {
  return `${duration}`.endsWith(1) ? `${duration} минута` :
  ['2', '3', '4'].some(char => `${duration}`.endsWith(char)) ? `${duration} минуты` : `${duration} минут`;
};
