const badRequestErrorCode = 400;
const authErrorCode = 401;
const conflictErrorCode = 409;

const authErrorMessage = 'Неверная почта или пароль.';
const conflictErrorMessage = 'Пользователем с такими e-mail уже существует.';
const serverErrorMessage = 'Что-то пошло не так! Попробуйте ещё раз.';
const successfulRegistration = 'Регистрация прошла успешно!';
const successfullyUserUpdated = 'Данные пользователя успешно обновлены.';
const movieNotDeleted = 'Фильм не может быть удален.';
const movieNotSaved = 'Фильм не может быть сохранен.';
const notFoundMessage = 'Ничего не найдено.';
const requestErrorMessage = `Во время запроса произошла ошибка.
Возможно, проблема с соединением или сервер недоступен.
Подождите немного и попробуйте ещё раз.`;
const validationMessage = 'Заполните это поле.'

module.exports = {
  successfulRegistration,
  successfullyUserUpdated,
  movieNotDeleted,
  movieNotSaved,
  badRequestErrorCode,
  authErrorCode,
  conflictErrorCode,
  authErrorMessage,
  conflictErrorMessage,
  serverErrorMessage,
  notFoundMessage,
  requestErrorMessage,
  validationMessage,
};
