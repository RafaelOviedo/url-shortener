import style from './NavBar.module.css';
import { Link, useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';

import {  useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const logOut = () => {
    dispatch(logout());
  }

  const logIn = () => {
    // ADD POST AUTH
    console.log('Log In');
  }

  return (
    <nav className={style.navContainer}>
      <div className={style.logoContainer}>
        <span onClick={() => navigate('/')} style={ { fontSize: '25px', fontWeight: 'bold', color: '#fff', cursor: 'pointer' } }>LIT URL</span>
      </div>

      <div className={style.navBox}>
        <Link 
          to='/about'
          className={style.linkItem}
        >
          About
        </Link>

          {
            currentUser ? (
              <>
                <button onClick={logOut} className={style.logout}>
                  <span>Logout</span>
                  &nbsp;
                  &nbsp;
                  <i className='pi pi-sign-out' style={{fontSize: '15px'}}></i>
                </button>
              </>
            ) : (
              <>
                <button onClick={logIn} className={style.logout}>
                  <span>Enter Email</span>
                  &nbsp;
                  &nbsp;
                  <i className='pi pi-sign-in' style={{fontSize: '15px'}}></i>
                </button>
              </>
            )
          }
      </div>
    </nav>
  )
}

export default NavBar;