class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  // Обработка ответа сервера
  _handlingResponse(result) {
    try {
      if (result.ok) {
        return result.json();
      } else {
        throw new Error(`Ошибка: ${result.status}`);
      }
    } catch (error) {
      return error;
    }
  }

  // Запрос фильмов
  getMovies() {
    return fetch(this._baseUrl, {
      credentials: 'include',
    })
      .then((result) => this._handlingResponse(result));
  }

}

const mainApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default mainApi;
