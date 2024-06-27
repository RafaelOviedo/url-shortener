import style from './NavBar.module.css';
import { Link, useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';

import SignInModal from '../Auth/SignInModal/SignInModal'

import {  useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useState } from 'react';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavbarItemsOpen, setIsNavbarItemsOpen] = useState(false);

  const logOut = () => {
    dispatch(logout());
  }

  const openNavBarPanel = () => {
    setIsNavbarItemsOpen(true);
  }

  const closeNavBarPanel = () => {
    setIsNavbarItemsOpen(false);
  }

  const openEmailModal = () => {
    setIsModalOpen(true);
  }

  const closeEmailModal = (data) => {
    setIsModalOpen(data);
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
              <button onClick={openEmailModal} className={style.logout}>
                <span>See my URL's</span>
                &nbsp;
                &nbsp;
                <i className='pi pi-sign-in' style={{fontSize: '15px'}}></i>
              </button>
            </>
          )
        }
      </div>

      <button
        class={style.openNavbarMenuButton}
        onClick={openNavBarPanel}
      >
        <i class="pi pi-bars" />
      </button>

      {
        isNavbarItemsOpen ? (
          <div className={style.mobileNavbarMenuContainer}>
            <div className={style.mobileNavBox}>
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
                    <button onClick={openEmailModal} className={style.logout}>
                      <span>See my URL's</span>
                      &nbsp;
                      &nbsp;
                      <i className='pi pi-sign-in' style={{fontSize: '15px'}}></i>
                    </button>
                  </>
                )
              }

              <button className={style.closeNavbarMenuButton} onClick={closeNavBarPanel}>X</button>
            </div>
          </div>
        ) : ''
      }
      
      {
        isModalOpen ? (
          <SignInModal onModalClose={closeEmailModal} />
        ) : ''
      }
    </nav>
  )
}

export default NavBar;