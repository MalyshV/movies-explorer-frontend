export const MOVIES_URL = 'https://api.nomoreparties.co';

export const checkMovie = (card) => {
  const shortFilm = card.duration <= 40;
    if (shortFilm) {
      console.log('я - короткометражка');
      return shortFilm;
    } else {
      console.log('а я - нет');
      return
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

export const filterMovies = (data, searchWord, searchList, checkbox) => {
  return searchList = data.filter((card) => {
    const isShortMovie = card.duration <= 40;
    const isFoundMovie = card.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ? card : null;

    if (checkbox) {
      return isShortMovie && isFoundMovie;
    }

    return isFoundMovie;
    // return card.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ? card : null;
  });
};

export const filterMoviesByLength = (data) => {
  data.filter((card) => {
    if (card.duration <= 40) {
      return card;
    }
  });
};
