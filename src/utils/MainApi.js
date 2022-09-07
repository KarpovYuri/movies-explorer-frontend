class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  // Обработка ответа сервера
  _handlingResponse(result) {
    if (result.ok) {
      return result.json();
    } else {
      // если ошибка, отклоняем промис
      return Promise.reject(result.status);
    }
  }

  // Запрос данных профиля
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
    })
      .then((result) => this._handlingResponse(result));
  }

  // Запрос сохраненных фильмов
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
    })
      .then((result) => this._handlingResponse(result))
  }

  // Отправка данных профиля
  addUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then((result) => this._handlingResponse(result));
  }

  // Добавление фильма в сохраненные
  savеMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieData)
    })
      .then((result) => this._handlingResponse(result));
  }

  // Удаление фильма из сохраненных
  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      credentials: 'include',
    })
      .then((result) => this._handlingResponse(result));
  }

}

const mainApi = new MainApi({
  baseUrl: 'https://api.movies.project.nomoredomains.sbs',
  // baseUrl: 'http://localhost:3000',
});

export default mainApi;
