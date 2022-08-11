import './AboutProject.css';
function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h1 className='title'>О проекте</h1>
      <hr className='line'></hr>
      <ul className='description'>
        <li className='description__block'>
          <h2 className='description__title'>Дипломный проект включал 5 этапов</h2>
          <p className='description__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className='description__block'>
          <h2 className='description__title'>На выполнение диплома ушло 5 недель</h2>
          <p className='description__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className='timeline'>
        <div className='timeline__block timeline__block_size_20'>
          <p className='timeline__duration timeline__duration_color_green'>1 неделя</p>
          <p className='timeline__title'>Back-end</p>
        </div>
        <div className='timeline__block timeline__block_size_80'>
          <p className='timeline__duration timeline__duration_color_grey'>4 недели</p>
          <p className='timeline__title'>Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
