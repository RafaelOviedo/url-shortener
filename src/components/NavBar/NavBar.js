import style from './NavBar.module.css';
import { Link, useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';

// import {  useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../features/auth/authSlice';

function NavBar() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.auth.user);

  // const signOut = () => {
  //   dispatch(logout());
  //   navigate('/');
  // }

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

          {/* {
            currentUser ? (
              <>
                <Link to='/profile' className={style.linkItem}>
                  <span>Profile</span>
                  &nbsp;
                  &nbsp;
                  <i className='pi pi-user' style={{fontSize: '10px'}}></i>
                </Link>

                <button onClick={signOut} className={style.logout}>
                  <span>Logout</span>
                  &nbsp;
                  &nbsp;
                  <i className='pi pi-sign-out' style={{fontSize: '10px'}}></i>
                </button>
              </>
            ) : (
              ''
            )
          } */}
      </div>
    </nav>
  )
}

export default NavBar;