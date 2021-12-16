export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

// общий getMovies - ??

export const findMovies = () => {
  return fetch(MOVIES_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  .then((res) => checkResponse(res));
}

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
