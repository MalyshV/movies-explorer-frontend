import { FULL_MOVIES_URL } from '../../utils/constants';

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
    })
    .then((res) => this._checkResponse(res));
  }
};

const moviesApi = new MoviesApi({
  baseUrl: FULL_MOVIES_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;
