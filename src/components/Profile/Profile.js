import React, { useContext, useEffect }  from 'react';
import { Button, Form, FormInput } from '../index';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

const Profile = ({ onUpdateUser, handleSignOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.name;
  const userEmail = currentUser.email;

  const { values, setValues, handleChange, errors, isValid } = useFormWithValidation({
    email: userEmail,
    name: userName,
  });

  const isDisabled = values.email === '' || !isValid || values.name === '' || (values.email === userEmail && values.name === userName);
  const profileButton = !isDisabled ? '' : ' button-disabled';

 useEffect(() => {
    setValues({
      name: userName,
      email: userEmail,
    });
  }, [currentUser, setValues, userName, userEmail]);

  const handleSubmit = (event) => {
    event.preventDefault();
    !isDisabled && onUpdateUser({
      name: values.name,
      email: values.email,
    });
  }

  const handleOut = () => {
    handleSignOut();
  };

  return (
    <Form logo="" name="profileForm" title={`Привет, ${userName}!`} titleClassName="_place_profile" linkPath="/" underFormQuestion="" linkName="Выйти из аккаунта" linkClassName="_type_loggenIn" profileLinkClassName="_place_profile" onClick={handleOut}>
      <FormInput required={true} minLength={2} maxLenght={30} labelClassName="_type_loggedin" inputClassName="_type_loggedin" labelFor="Имя" labelName="Имя" inputType="text" inputName="name" tabIndex="1" value={values.name || ''} pattern="^[a-zA-Zа-яА-ЯёЁ\-\s]+$" placeholder="" spanText={errors.name} spanClassName="_type_loggedin" onChange={handleChange} />
      <FormInput required={true} labelClassName="_type_loggedin" inputClassName="_type_loggedin" inputType="email" labelName="E-mail" labelFor="E-mail" inputName="email" tabIndex="2" value={values.email || ''} placeholder="" spanText={errors.email} spanClassName="_type_loggedin" onChange={handleChange} />
      <Button textOnButton="Редактировать" buttonClassName={profileButton} disabled={isDisabled} tabIndex="3" onClick={handleSubmit} />
    </Form>
  )
};

export default Profile;
