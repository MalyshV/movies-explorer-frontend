export const filterMovies = (data, searchWord, searchList) => {
  searchList = data.filter((card) => {
    return card.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ? card : null;
  });
  return searchList;
};
