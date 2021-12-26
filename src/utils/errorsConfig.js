const errors = {
  pswErr: 'Что-то пошло не так...',
  nameErr: 'Имя должно содержать от 2 до 30 символов',
  mailErr: 'Введите e-mail',
  invalidEmailErr: 'Вы ввели неправильный логин или пароль.',
  invalidTokenErr: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  invalidAuthErr: 'При авторизации произошла ошибка. Переданный токен некорректен.',
  dubbleEmailErr: 'Пользователь с таким email уже существует.',
  invalivRegErr: 'При регистрации пользователя произошла ошибка.',
  updateProfileErr: 'При обновлении профиля произошла ошибка.',
  serverErr: '500 На сервере произошла ошибка.',
  notFoundErr: '404 Страница по указанному маршруту не найдена.',
};

export const invalidAuthErr = 'При авторизации произошла ошибка. Переданный токен некорректен.';
export const invalivRegErr = 'При регистрации пользователя произошла ошибка.';
export const updateProfileErr = 'При обновлении профиля произошла ошибка.';
export const invalidEmailErr = 'Вы ввели неправильный логин или пароль.';

export default errors;
