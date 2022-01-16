class MoviesApi {
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

  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  findMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // credentials: 'include', // снова убрала, чтобы добраться до фильмов. Скорее всего из-за этого не было изображения на /saved-movies
    })
    .then((res) => this._checkResponse(res));
  }
};

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;
