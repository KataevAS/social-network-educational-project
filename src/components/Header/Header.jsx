import React, { useState } from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginOut } from '../../redux/reducers/auth-reducer';
import defaultAvatar from '../../assets/img/defaultAvatar.png';

const Header = () => {
    const [menuStatus, setMenuStatus] = useState(false);

    const userData = useSelector(state => state.auth);
    const photo = useSelector(state => state.auth.authUser.photos);

    const dispatch = useDispatch();

    const handleClickMenu = () => {
        if (menuStatus) {
            setMenuStatus(false)
        } else {
            setMenuStatus(true);
            clickOutside(styles.menuItems);
        }
    }

    const handleClickLoginOut = () => {
        dispatch(loginOut());
    }

    const clickOutside = (selector) => {
        const el = document.querySelector("." + selector);
        document.addEventListener('click', outsideEvtListener);
        function outsideEvtListener(evt) {
            if (evt.target === el) {
                return document.removeEventListener('click', outsideEvtListener);
            }
            setMenuStatus(false)
            document.removeEventListener('click', outsideEvtListener);
        }
    }

    return (
        <header className={styles.header}>
            <section className={styles.headerContent}>


                <a href='http://localhost:3000/' className={styles.logoItems}>
                    <div className={styles.logoImg}></div>
                    <div>social-network.samuraijs.com</div>
                </a>


                <div>
                    {userData.isAuth
                        ? <div className={styles.user} onClick={handleClickMenu}>
                            <img src={photo.large ? photo.large : defaultAvatar} alt='ava' className={styles.ava} />
                            <div className={menuStatus ? styles.menuBtn + " " + styles.menuActive : styles.menuBtn}></div>
                            < div className={menuStatus ? styles.menu + " " + styles.menuActive : styles.menu}>
                                <NavLink to="/editprofile" className={styles.navLink}>
                                    <div className={styles.menuItems}>Настройки профиля</div>
                                </NavLink>
                                <div className={styles.menuItems} onClick={handleClickLoginOut}>Выйти</div>
                            </div>
                        </div>
                        : <NavLink to="/login" className={styles.navLink}>[ Login ]</NavLink>
                    }
                </div>

            </section>
        </header >
    );
}

export default Header;