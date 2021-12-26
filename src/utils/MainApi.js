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

  // updateUserInfo - ??

  // filterMovies - ??

  // addMovie - ??

  saveMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/:movieId`, {
      method: 'PUT',
      headers: this._checkToken(this._headers),
      credentials: 'include',
    })
    .then((res) => this._checkResponse(res));
  };

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/:movieId`, {
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
