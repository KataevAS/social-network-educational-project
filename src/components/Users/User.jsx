import React from 'react';
import defaultAvatar from '../../assets/img/defaultAvatar.png';
import styles from './Users.module.css';
import { NavLink } from 'react-router-dom';


const User = (props) => {
    return (
        <div className={styles.user}>
            <NavLink to={`/profile/${props.user.id}`}>
                <img className={styles.ava} src={props.user.photos.large || defaultAvatar} alt="ava" />
            </NavLink>
            <div>{props.user.name}</div>
            <div>{props.user.status}</div>
            <div>{props.user.followed ? "Подписан" : "Не подписан"}</div>
        </div>
    );
}

export default User;