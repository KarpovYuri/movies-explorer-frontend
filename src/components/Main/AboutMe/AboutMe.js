import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

import myPhoto from '../../../images/my-photo.jpg';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='title'>Студент</h2>
      <hr className='line'></hr>
      <div className='about-me__container'>
        <div className='about-me__wrapper'>
          <p className='about-me__name'>Юрий</p>
          <p className='about-me__job'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__description'>
            Я родился и живу в Воронеже, закончил факультет экономики ВГУИТ.
            Люблю кататься на роликовых коньках и увлекаюсь автозвуком.
            Год назад прошел отбор в "Яндекс.Практикум" на факультет "Веб-разработки"
            по программе "Цифровая профессия в подарок".
            Успешно прошел стажировку в компании "MOVIKA", занимющейся разработкой
            интерактивного контента.
          </p>
          <ul className='about-me__social-links'>
            <li>
              <a
                className='about-me__social-link hover'
                target='_blank'
                href='https://www.facebook.com/profile.php?id=100000459328645'
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                className='about-me__social-link hover'
                target='_blank'
                href='https://github.com/Yurick78'
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className='myPhoto' alt='Моя фотография' src={myPhoto} />
      </div>
      <Portfolio />
    </section>
  );
};

export default AboutMe;
