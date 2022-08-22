import './More.css';

function More({ isShowMore }) {

  return (
    <section className={`more ${isShowMore ? 'more_height_big' : 'more_height_small'}`}>
      <button
        type='button'
        className={`more__btn hover-btn ${isShowMore ? '' : 'more__btn_hide'}`}
      >
        Ещё
      </button>
    </section>
  );
};

export default More;
