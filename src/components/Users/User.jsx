import React from 'react';
import defaultAvatar from '../../assets/img/defaultAvatar.png';
import styles from './Users.module.css';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { followUser, unFollowUser } from '../../redux/reducers/users-reducer';
import { useDispatch } from 'react-redux';


const User = ({ user }) => {
    const dispatch = useDispatch();


    const handleClickFollow = () => (
        dispatch(followUser(user.id))
    )

    const handleClickUnFollow = () => {
        dispatch(unFollowUser(user.id))
    }


    return (
        <div className={styles.user}>
            <Link to={`/profile/${user.id}`} className={styles.userLink}>
                <img className={styles.ava} src={user.photos.large || defaultAvatar} alt="ava" />
            </Link>
            <div className={styles.userInfo}>
                <div>{user.name}</div>
                <div className={styles.userStatus}>
                    {user.status}
                </div>
                {
                    user.followed
                        ? <Button
                            onClick={handleClickUnFollow}
                            className={styles.followBtn + ' ' + styles.followBtnNo}
                            disabled={user.loadingFollowBtn}
                            key={user.id}>Отписаться
                        </Button>
                        : <Button
                            onClick={handleClickFollow}
                            className={styles.followBtn + ' ' + styles.followBtnYes}
                            disabled={user.loadingFollowBtn}
                            key={user.id}>Подписаться
                        </Button>
                }
            </div>
        </div>
    );
}

export default User;