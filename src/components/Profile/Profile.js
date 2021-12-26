import React, { useState, useContext, useEffect }  from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import errors from '../../utils/errorsConfig';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onUpdateUser, handleSignOut }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const handleRedClick = () => setIsClicked(!isClicked);

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
  };

  const handleOut = () => {
    handleSignOut();
  };

  return (
    <>
      <Form logo="" name="profileForm" title={`Привет, ${currentUser.name}!`} titleClassName="_place_profile" linkPath="/" underFormQuestion="" linkName="Выйти из аккаунта" linkClassName="_type_loggenIn" profileLinkClassName="_place_profile" onClick={handleOut}>
      {!isClicked ?
          <ul className="profile__items">
            <li className="profile__item">
              <h3 className="profile__title">Имя</h3>
              <p className="profile__subtitle">{currentUser.name}</p>
            </li>
            <li className="profile__item">
              <h3 className="profile__title">E-mail</h3>
              <p className="profile__subtitle">{currentUser.email}</p>
            </li>
          </ul>
        :
        <>
            <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" labelFor="Имя" labelName="Имя" inputType="text" inputName="userName" tabIndex="1" value={userName || ''} placeholder="" spanText={errors.nameErr} onChange={handleUserNameChange} />
            <FormInput labelClassName="_type_loggedin" inputClassName="_type_loggedin" inputType="email" labelName="E-mail" labelFor="E-mail" tabIndex="2" value={userEmail || ''} placeholder="" spanText={errors.mailErr} onChange={handleUserEmailChange} />
          </>
        }
        <Button textOnButton={!isClicked ? "Редактировать" : "Сохранить"} buttonClassName="_place_profile" tabIndex="3" onClick={isClicked ? handleSubmit : handleRedClick} />
      </Form>
    </>
  )
};

export default Profile;

// на время добавила в верстку блок и кнопку сохранить. может задать ей класс?