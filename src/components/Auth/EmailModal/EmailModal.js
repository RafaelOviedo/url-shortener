import axios from 'axios';
import style from './EmailModal.module.css';
import { useState } from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';

import {  useDispatch } from 'react-redux';
import { setUser } from '../../../features/auth/authSlice';

function EmailModal({ onModalClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  
  const dispatch = useDispatch();

  const handleNameInputChange = (event) => {
    setNameInput(event.target.value);
  }

  const handleEmailInputChange = (event) => {
    setEmailInput(event.target.value);
  }

  const createUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('/users', { name: emailInput, email: emailInput });
      dispatch(setUser(response.data));
      setNameInput('');
      setEmailInput('');
      setIsLoading(false);
      closeEmailModal();
    } 
    catch (error) {
      setIsError(true);
      setIsLoading(false);
      throw new Error(error);
    }
  }

  const closeEmailModal = () => {
    onModalClose(false)
  }

  return (
    <div className={style.emailModal}>
      <div className={style.closeModalButtonContainer}>
        <button className={style.closeModalButton} onClick={closeEmailModal}>x</button>
      </div>
      
      <div className={style.modalContentContainer}>
        <h2>Add your email</h2>
        <span className={style.errorMessage}>{ isError ? 'The account already exists, please try a different email' : '' }</span>
        <form onSubmit={createUser} className={style.formContainer}>
          <input onChange={handleNameInputChange} className={style.nameInput} value={nameInput} type="text" placeholder='Add your name...' />
          <input onChange={handleEmailInputChange} className={style.emailInput} value={emailInput} type="email" placeholder='Add your email...' />
          <button type='submit' className={style.addEmailButton}>{ isLoading ? <ProgressSpinner style={ { width: '35px', height: '35px' } } strokeWidth="4" /> : 'Add Email' }</button>
        </form> 
      </div> 
    </div>
  )
}

export default EmailModal;