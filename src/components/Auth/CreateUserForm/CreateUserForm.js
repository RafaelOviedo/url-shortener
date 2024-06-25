import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../features/auth/authSlice';

import style from './SigninForm.module.css';
import axios from 'axios';

import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';

function SigninForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [signinForm, setSigninForm] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSigninForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const createUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/auth', signinForm);
      const user = response.data.user;
      const token = response.data.jwt;

      dispatch(setUser({ user: user, token: token }));

      setSigninForm({ email: '', password: '' });
      showSuccessToast();
      navigate('/home')
    } 
    catch (error) {
      showFailureToast();
      throw new Error(error);
    } 
    finally {
      setIsLoading(false);
    }
  }

  const showSuccessToast = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Loged in successfully!', life: 5000 });
  };
  const showFailureToast = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'There was a problem loging into your account, please try again!', life: 5000 });
  };

  return (
    <form className={style.signinFormContainer}>
      <Toast ref={toast} position="top-center" />

      <div className={style.formSection}>
        <label
          htmlFor="email"
          className={style.label}
        >
          Email*
        </label>
        <input
          value={signinForm.email}
          className={style.inputBox}
          type="email"
          name="email"
          onChange={handleInputChange}
        />
      </div>

      <div className={style.formSection}>
        <label
          htmlFor="password"
          className={style.label}
        >
          Password*
        </label>
        <input
          value={signinForm.password}
          className={style.inputBox}
          type="password"
          name="password"
          onChange={handleInputChange}
        />
      </div>

      <div className={style.buttonsContainer}>
        {/* <p
          v-if="serverErrors"
          class="error-msg"
        >
          Alguno de los campos es incorrecto, por favor intente nuevamente
        </p> */}

        <button
          onClick={createUser}
          className={style.signinButton}
        >
          { isLoading ? <ProgressSpinner style={ { width: '35px', height: '35px' } } strokeWidth="4" /> : 'Sign In' }
        </button>
      
        <button
          onClick={() => navigate('/sign_up')}
          className={style.dontHaveAccount}
        >
          ¿Don't have an account? Sign Up!
        </button>
      </div>
    </form>
  )
}

export default SigninForm;