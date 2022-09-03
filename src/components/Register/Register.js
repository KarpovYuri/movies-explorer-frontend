import Form from '../Form/Form';

function Register({ onRegister, isResponseMessage }) {
  return (
    <Form
      title={'Добро пожаловать!'}
      pageType={'signup'}
      button={'Зарегистрироваться'}
      text={`Уже зарегистрированы? `}
      onSubmitForm={onRegister}
      isResponseMessage={isResponseMessage}
    />
  );
};

export default Register;
