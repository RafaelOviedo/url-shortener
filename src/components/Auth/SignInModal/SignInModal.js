import axios from 'axios';
import style from './SignInModal.module.css';
import { useState } from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';

import {  useDispatch } from 'react-redux';
import { setUser } from '../../../features/auth/authSlice';

function SignInModal({ onModalClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  
  const dispatch = useDispatch();

  const handleEmailInputChange = (event) => {
    setEmailInput(event.target.value);
  }

  const accessWithEmail = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('/auth', { email: emailInput });
      dispatch(setUser(response.data));
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
        <h2 style={ { color: '#9290C3' } }>Enter your email</h2>
        <span className={style.errorMessage}>{ isError ? 'The account doesn\'t exists, please add an email first' : '' }</span>
        <form onSubmit={accessWithEmail} className={style.formContainer}>
          <input onChange={handleEmailInputChange} className={style.emailInput} value={emailInput} type="email" placeholder='Enter your email...' />
          <button type='submit' className={style.accessButton}>{ isLoading ? <ProgressSpinner style={ { width: '35px', height: '35px' } } strokeWidth="4" /> : 'Access' }</button>
        </form> 
      </div> 
    </div>
  )
}

export default SignInModal;