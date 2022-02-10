export const filterMovies = (data, searchWord, searchList, noResult, cb) => {
  searchList = data.filter((card) => {
    return card.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ? card : null;
  });

  noResult = searchList.length === 0 ? true : false;

  // noResult = searchList.length === 0 ? console.log('Ничего не найдено') : null;

  searchList.length === 0 && alert(searchList.length);

  return searchList;
};
