import './ErrorPage.css';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {

  const previousPage = useNavigate();

  function handleClickBack() {
    previousPage(-1);
  };

  return (
    <section className='error-page'>
      <h1 className='error-page__title'>404</h1>
      <p className='error-page__description'>Страница не найдена</p>
      <p className='error-page__link hover' onClick={handleClickBack}>Назад</p>
    </section>
  );
};

export default ErrorPage;
