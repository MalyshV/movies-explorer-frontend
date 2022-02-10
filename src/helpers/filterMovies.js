export const filterMovies = (data, searchWord, searchList, noResult, cb) => {
  searchList = data.filter((card) => {
    return card.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ? card : null;
  });
  noResult = searchList.length === 0 ? true : false;
  return searchList;
};
