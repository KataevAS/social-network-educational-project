import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={styles.header}>
            <section className={styles.headerContent}>

                <div className={styles.logoItems}>
                    <a href='http://localhost:3000/'><div className={styles.logoImg}></div></a>
                    <div className={styles.logoText}>social-network.samuraijs.com</div>
                </div>

                <div>
                    {props.userData.isAuth
                        ? props.userData.login
                        : <NavLink to="/login" className={styles.navLink}>[ Login ]</NavLink>}
                </div>

            </section>
        </header>
    );
}


export default Header;