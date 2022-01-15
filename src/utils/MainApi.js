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
        country: card.country ? card.country : 'данные не указаны',
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`, // и так тоже не работает.....
        trailer: card.trailerLink,
        thumbnail: card.trailerLink,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN ? card.nameEN : 'данные не указаны',
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

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
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
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
