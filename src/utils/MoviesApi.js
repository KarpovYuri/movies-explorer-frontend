class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  // Обработка ответа сервера
  _handlingResponse(result) {
    if (result.ok) {
      return result.json();
    } else {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }

  // Запрос фильмов
  getMovies() {
    return fetch(this._baseUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => this._handlingResponse(result));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default moviesApi;
