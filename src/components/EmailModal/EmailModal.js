import axios from 'axios';
import style from './EmailModal.module.css';
import { useState } from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';

import {  useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';

function EmailModal({ onModalClose }) {
  const [isLoading, setIsLoading] = useState(false);
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
        <form onSubmit={createUser} className={style.formContainer}>
          <input onChange={handleNameInputChange} className={style.nameInput} value={nameInput} type="text" placeholder='Add your name...' />
          <input onChange={handleEmailInputChange} className={style.emailInput} value={emailInput} type="text" placeholder='Add your email...' />
          <button type='submit' className={style.uploadButton}>{ isLoading ? <ProgressSpinner style={ { width: '35px', height: '35px' } } strokeWidth="4" /> : 'Add Email' }</button>
        </form> 
      </div> 
    </div>
  )
}

export default EmailModal;