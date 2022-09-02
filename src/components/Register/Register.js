import Form from '../Form/Form';

function Register({ onRegister, isPopupMessage, isAccept }) {
  return (
    <Form
      title={'Добро пожаловать!'}
      type={'signup'}
      button={'Зарегистрироваться'}
      text={`Уже зарегистрированы? `}
      onClick={onRegister}
      isPopupMessage={isPopupMessage}
      isAccept={isAccept}
    />
  );
};

export default Register;
