import React, { useState, useContext, useEffect }  from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useValidation';

const Profile = ({ onUpdateUser, handleSignOut }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.name;
  const userEmail = currentUser.email;

  const { values, setValues, handleChange, errors, isValid } = useFormWithValidation();

  useEffect(() => {
    setValues({
      name: userName,
      email: userEmail,
    });
  }, [currentUser, setValues, userName, userEmail]);

  useEffect(() => {
    setIsUpdated(
      !(values.name === userName) || !(values.email === userEmail)
    );
  }, [values.name, values.email, userName, userEmail]);

  const profileButton = isUpdated ?  '_place_profile' : '_place_profile button-disabled';

  const handleSubmit = (e) => {
      e.preventDefault();
      onUpdateUser({
        name: values.name,
        email: values.email,
      });
  }

  const handleOut = () => {
    handleSignOut();
  };

  return (
      <Form logo="" name="profileForm" title={`Привет, ${userName}!`} titleClassName="_place_profile" linkPath="/" underFormQuestion="" linkName="Выйти из аккаунта" linkClassName="_type_loggenIn" profileLinkClassName="_place_profile" onClick={handleOut}>
        <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" labelFor="Имя" labelName="Имя" inputType="text" inputName="name" tabIndex="1" value={values.name || ''} placeholder="" spanText={errors.name} onChange={handleChange} />
        <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" inputType="email" labelName="E-mail" labelFor="E-mail" inputName="email" tabIndex="2" value={values.email || ''} placeholder="" spanText={errors.email} onChange={handleChange} />
        <Button textOnButton="Редактировать" buttonClassName={profileButton} disabled={isUpdated} tabIndex="3" onClick={handleSubmit} />
      </Form>
  )
};

export default Profile;
