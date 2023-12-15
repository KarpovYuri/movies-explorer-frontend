import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="title">Технологии</h2>
      <hr className="line"></hr>
      <h2 className="techs__subtitle">7 технологий</h2>
      <p className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>

      <div className="techs__list-wrapper">
        <ul className="techs__list">
          <li className="techs__list-elem">HTML</li>
          <li className="techs__list-elem">CSS</li>
          <li className="techs__list-elem">JS</li>
          <li className="techs__list-elem">React</li>
          <li className="techs__list-elem">Git</li>
          <li className="techs__list-elem">Express.js</li>
          <li className="techs__list-elem">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
