import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './CreateGroupForm.module.css';
import axios from 'axios';

import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';

import { setUser } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

function CreateGroupForm() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const groupId = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [userFields, setUserFields] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch();

  const handleGroupInputChange = (event) => {
    const { value } = event.target;
    setGroupName(value);
  };

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;

    setUserFields(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const createGroup = async () => {
    try {
      const response = await axios.post('/groups', { name: groupName });
      groupId.current = response.data.id;
    } 
    catch (error) {
      throw new Error(error);
    } 
  }

  const createUser = async () => {
    try {
      const userResponse = await axios.post('/users', { 
        group_id: groupId.current, 
        email: userFields.email, 
        password: userFields.password, 
        password_confirmation: userFields.password 
      });

      const authResponse = await axios.post('/auth', { 
        email: userResponse.data.email, 
        password: userFields.password 
      });

      const user = authResponse.data.user;
      const token = authResponse.data.jwt;

      dispatch(setUser({ user: user, token: token }));
    } 
    catch (error) {
      throw new Error(error);
    }
  }

  const createGroupWithUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await createGroup();
      await createUser();
      
      setTimeout(() => {
        navigate(`/group/${groupId.current}`);
      }, 3500);
    } 
    catch (error) {
      showFailureToast();
      throw new Error(error);
    } 
    finally {
      setTimeout(() => {
        showSuccessToast();
        setIsLoading(false);

        setGroupName('');
        setUserFields({
          email: '',
          password: '',
        });
      }, 2000);
    }
  }

  const showSuccessToast = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Account created successfully!', life: 2000 });
  };
  const showFailureToast = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'There was a problem creating your account, please try again!', life: 4000 });
  };

  return (
    <form className={style.signupFormContainer}>
      <Toast ref={toast} position="top-center" />

      <div className={style.formSection}>
        <label
          htmlFor="group_name"
          className={style.label}
        >
          Group Name*
        </label>
        <input
          value={groupName}
          className={style.inputBox}
          type="text"
          name="group_name"
          onChange={handleGroupInputChange}
        />
      </div>

      <div className={style.formSection}>
        <label
          htmlFor="email"
          className={style.label}
        >
          Email*
        </label>
        <input
          value={userFields.email}
          className={style.inputBox}
          type="email"
          name="email"
          onChange={handleUserInputChange}
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
          value={userFields.password}
          className={style.inputBox}
          type="password"
          name="password"
          onChange={handleUserInputChange}
        />
      </div>

      <div className={style.buttonsContainer}>
        <button
          onClick={createGroupWithUser}
          className={style.createGroupButton}
        >
          { isLoading ? <ProgressSpinner style={ { width: '35px', height: '35px' } } strokeWidth="4" /> : 'Create Group' }
        </button>
      </div>
    </form>
  )
}

export default CreateGroupForm;