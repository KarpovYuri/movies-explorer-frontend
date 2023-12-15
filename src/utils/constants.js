const BAD_REQUEST_ERROR_CODE = 400;
const AUTH_ERROR_CODE = 401;
const CONFLICT_ERROR_CODE = 409;

const AUTH_ERROR_MESSAGE = "Неверная почта или пароль.";
const CONFLICT_ERROR_MESSAGE = "Пользователем с такими e-mail уже существует.";
const SERVER_ERROR_MESSAGE = "Что-то пошло не так! Попробуйте ещё раз.";
const SUCCESSFUL_REGISTRATION_MESSAGE = "Регистрация прошла успешно!";
const SUCCESSFUL_USER_UPDATED_MESSAGE =
  "Данные пользователя успешно обновлены.";
const MOVIE_NOT_DELETED_MESSAGE = "Фильм не может быть удален.";
const MOVIE_NOT_SAVED_MESSAGE = "Фильм не может быть сохранен.";
const NOT_FOUND_MESSAGE = "Ничего не найдено.";
const REQUEST_ERROR_MESSAGE = `Во время запроса произошла ошибка.
Возможно, проблема с соединением или сервер недоступен.
Подождите немного и попробуйте ещё раз.`;

module.exports = {
  SUCCESSFUL_REGISTRATION_MESSAGE,
  SUCCESSFUL_USER_UPDATED_MESSAGE,
  MOVIE_NOT_DELETED_MESSAGE,
  MOVIE_NOT_SAVED_MESSAGE,
  BAD_REQUEST_ERROR_CODE,
  AUTH_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  AUTH_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  REQUEST_ERROR_MESSAGE,
};
