import { MOVIES_URL } from '../constants';

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  };

  _checkToken = (headers) => {
    const token = localStorage.getItem('jwt');

    if (token) {
      headers['authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._checkToken(this._headers),
      credentials: 'include',
    })
    .then((res) => this._checkResponse(res));
  };

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._checkToken(this._headers),
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
    .then((res) => this._checkResponse(res));
  };

  saveMovie(card) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._checkToken(this._headers),
      credentials: 'include',
      body: JSON.stringify({
        country: card.country === null ? card.nameRU : card.country,
        description: card.description,
        director: card.director,
        duration: card.duration,
        image: `${MOVIES_URL}${card.image.url}`,
        movieId: card.id,
        nameEN: card.nameEN === null ? 'данные не указаны' : card.nameEN,
        nameRU: card.nameRU,
        thumbnail: `${MOVIES_URL}${card.image.url}`,
        trailer: card.trailerLink === null ? 'данные не указаны' : card.trailerLink,
        year: card.year,
      }),
    })
    .then((res) => this._checkResponse(res));
  };

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._checkToken(this._headers),
      credentials: 'include',
    })
    .then((res) => this._checkResponse(res)
    )
  };

  deleteMovie(card) {
    return fetch(`${this._baseUrl}/movies/${card._id}`, {
      method: 'DELETE',
      headers: this._checkToken(this._headers),
      credentials: 'include',
    })
    .then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const api = new Api({
  // baseUrl: 'https://yourmoviesexplorer.nomoredomains.rocks/api',
  baseUrl: 'https://api.yourmoviesexplorer.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
