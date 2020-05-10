import React from 'react';
import defaultAvatar from '../../assets/img/defaultAvatar.png';
import styles from './Users.module.css';
import Button from '../common/Button';
import { Link } from 'react-router-dom';


const User = (props) => {
    return (
        <div className={styles.user}>
            <Link to={`/profile/${props.user.id}`} className={styles.userLink}>
                <img className={styles.ava} src={props.user.photos.large || defaultAvatar} alt="ava" />
            </Link>
            <div className={styles.userInfo}>
                <div>{props.user.name}</div>
                <div className={styles.userStatus}>{props.user.status}</div>
                {props.user.followed
                    ? <Button
                        onClick={() => props.unFollowUser(props.user.id)}
                        className={styles.followBtn + ' ' + styles.followBtnNo}
                        disabled={props.user.loadingFollowBtn}
                        key={props.user.id}>Отписаться</Button>
                    : <Button
                        onClick={() => props.followUser(props.user.id)}
                        className={styles.followBtn + ' ' + styles.followBtnYes}
                        disabled={props.user.loadingFollowBtn}
                        key={props.user.id}>Подписаться</Button>}
            </div>
        </div>
    );

}

export default User;