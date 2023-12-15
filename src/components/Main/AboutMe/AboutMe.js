import Portfolio from "../Portfolio/Portfolio";
import "./AboutMe.css";

import myPhoto from "../../../images/my-photo.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="title">Студент</h2>
      <hr className="line"></hr>
      <div className="about-me__container">
        <div className="about-me__wrapper">
          <p className="about-me__name">Карпов Юрий</p>
          <p className="about-me__job">Фронтенд-разработчик из Воронежа</p>
          <p className="about-me__description">
            Владею крепкими знаниями Веб-разработки, включая HTML, CSS,
            JavaScript, TypeScript и Node.js. Опыт работы с бэкенд-фреймворком
            Express.js. Умею создавать интуитивно понятный и эффективный
            пользовательский интерфейс, используя фронтенд-фреймворки, такие как
            React и Vue.
          </p>
          <p className="about-me__description">
            Благодаря своей творческой природе и внимательному отношению к
            деталям, всегда стремлюсь к созданию привлекательных и
            функциональных проектов, которые соответствуют потребностям
            клиентов.
          </p>
          <ul className="about-me__social-links">
            <li>
              <a
                className="about-me__social-link hover"
                target="_blank"
                href="https://github.com/KarpovYuri"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                className="about-me__social-link hover"
                target="_blank"
                href="https://www.linkedin.com/in/karpov-yuri/"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="about-me__social-link hover"
                target="_blank"
                href="https://vk.com/karpov_yn"
                rel="noreferrer"
              >
                VK
              </a>
            </li>
            <li>
              <a
                className="about-me__social-link hover"
                target="_blank"
                href="https://www.facebook.com/profile.php?id=100000459328645"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
        <img className="myPhoto" alt="Моя фотография" src={myPhoto} />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
