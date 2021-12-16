export const BASE_URL = 'http://localhost:3001';

// регистрация
export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // credentials: 'include', // надо ли мне это сейчас?
    body: JSON.stringify({ email, password, name })
  })
  .then((res) => checkResponse(res));
};

// логин
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // credentials: 'include', // надо ли мне это сейчас?
    body: JSON.stringify({ email, password })
  })
  .then((res) => checkResponse(res));
};

// проверка ответа
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
