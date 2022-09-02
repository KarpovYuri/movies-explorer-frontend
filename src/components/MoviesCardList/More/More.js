import './More.css';

function More({ incMoviesCounter, isBtnHiden = false }) {

  return (
    <section className={`more ${isBtnHiden ? 'more_height_small' : 'more_height_big'}`}>
      <button
        type='button'
        className={`more__btn hover-btn ${isBtnHiden && 'more__btn_hide'}`}
        onClick={incMoviesCounter}
      >
        Ещё
      </button>
    </section>
  );
};

export default More;
