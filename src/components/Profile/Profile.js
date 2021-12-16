import React, { useState, useContext, useEffect }  from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import errors from '../../utils/errorsConfig';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onUpdateUser, handleSignOut }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const currentUser = useContext(CurrentUserContext);

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleUserEmailChange =(e) => setUserEmail(e.target.value);

  useEffect(() => {
    setUserName(currentUser.userName);
    setUserEmail(currentUser.userEmail);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: userName,
      email: userEmail,
    });
  }

  return (
    <>
      <Form logo="" name="profileForm" title={`Привет, ${currentUser.name}`} titleClassName="_place_profile" linkPath="/"  underFormQuestion="" linkName="Выйти из аккаунта" linkClassName="_type_loggenIn" profileLinkClassName="_place_profile" onSubmit={handleSubmit} onclick={handleSignOut}>
        <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" labelName="Имя" inputType="text" inputName="userName" tabIndex="1" value={currentUser.name || ''} placeholder="" spanText={errors.nameErr} onChange={handleUserNameChange} />
        <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" inputType="email" labelName="E-mail" tabIndex="2" value={currentUser.email || ''} placeholder="" spanText={errors.mailErr} onChange={handleUserEmailChange} />
        <Button textOnButton="Редактировать" buttonClassName="_place_profile" tabIndex="3" />
      </Form>
    </>
  )
}

export default Profile;
