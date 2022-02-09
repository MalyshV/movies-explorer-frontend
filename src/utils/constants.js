export const MOVIES_URL = 'https://api.nomoreparties.co';

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

export const filterMovies = (data, searchWord, searchList, noResult, cb) => {
  searchList = data.filter((card) => {
    return card.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ? card : null;
  });

  noResult = searchList.length === 0 ? true : false;

  // noResult = searchList.length === 0 ? console.log('Ничего не найдено') : null;

  searchList.length === 0 && alert(searchList.length);

  return searchList;
};

/* export const checkSearchListLength = ( noResult, newArray, arr, word) => {
  newArray = filterMovies(arr, word);
  noResult = newArray.length === 0 ? true : false;

  console.log(noResult);
  return noResult;
}; */
