import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li>
          <a
            className="portfolio__link hover"
            target="_blank"
            href="https://github.com/Yurick78/how-to-learn"
            rel="noreferrer"
          >
            <p className="portfolio__link-title">Статичный сайт</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
          <hr className="line line_place_portfolio"></hr>
        </li>
        <li>
          <a
            className="portfolio__link hover"
            target="_blank"
            href="https://github.com/Yurick78/russian-travel"
            rel="noreferrer"
          >
            <p className="portfolio__link-title">Адаптивный сайт</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
          <hr className="line line_place_portfolio"></hr>
        </li>
        <li>
          <a
            className="portfolio__link hover"
            target="_blank"
            href="https://github.com/Yurick78/react-mesto-api-full"
            rel="noreferrer"
          >
            <p className="portfolio__link-title">Одностраничное приложение</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
