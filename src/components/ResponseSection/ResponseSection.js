import './ResponseSection.css';

function ResponseSection({ isResponseMessage }) {

  return (
    <section className='response'>
      <div className='response__message'>{isResponseMessage}</div>
    </section>
  );
};

export default ResponseSection;
