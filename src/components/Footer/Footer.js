import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <hr className="line line_place_footer"></hr>
      <div className="footer__wrapper">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__link-wrapper">
            <a
              className="footer__link hover"
              target="_blank"
              href="https://practicum.yandex.ru/"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link-wrapper">
            <a
              className="footer__link hover"
              target="_blank"
              href="https://github.com/KarpovYuri"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__link-wrapper">
            <a
              className="footer__link hover"
              target="_blank"
              href="https://www.linkedin.com/in/karpov-yuri/"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li className="footer__link-wrapper">
            <a
              className="footer__link hover"
              target="_blank"
              href="https://vk.com/karpov_yn"
              rel="noreferrer"
            >
              VK
            </a>
          </li>
          <li className="footer__link-wrapper">
            <a
              className="footer__link hover"
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100000459328645"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
