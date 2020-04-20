import React from 'react';
import styles from './Navbar.module.css';
import { NavLink, withRouter } from 'react-router-dom';

const Navbar = (props) => {
    let url = props.location.pathname;
    let styleActiveItems = styles.items + " " + styles.active;
return (
    <div className={styles.navbar}>
        <NavLink to='/profile' ><div className={url === '/profile' ? styleActiveItems : styles.items}>Мой профиль</div></NavLink>
        <NavLink to='/dialogs' ><div className={url === '/dialogs' ? styleActiveItems : styles.items}>Диалоги</div></NavLink>
        <NavLink to='/users' ><div className={url === '/users' ? styleActiveItems : styles.items}>Пользователи</div></NavLink>
    </div>
);
}

export default withRouter(Navbar);