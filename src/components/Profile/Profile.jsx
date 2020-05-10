import React, { useEffect } from 'react';
import defaultAvatar from '../../assets/img/defaultAvatar.png';
import styles from './Profile.module.css';
import Contacts from './Contacts';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../actions/profileActions';
import { useParams } from 'react-router-dom';


const Profile = () => {
    //------Initial data------
    const name = useSelector(state => state.profile.fullName);
    const status = useSelector(state => state.profile.status);
    const lookingForAJob = useSelector(state => state.profile.lookingForAJob);
    const lookingForAJobDescription = useSelector(state => state.profile.lookingForAJobDescription);
    const followed = useSelector(state => state.profile.followed);
    const isFetching = useSelector(state => state.profile.isFetching);
    const photo = useSelector(state => state.profile.photos.large);
    const authId = useSelector(state => state.auth.authUser.userId);
    const userId = useParams().userId;
    const contacts = useSelector(state => state.profile.contacts);
    const dispatch = useDispatch();

    useEffect(() => {
        userId ? dispatch(getUserProfile(userId)) : dispatch(getUserProfile(authId));
    }, [userId, authId, dispatch])


    //------Loading users array------
    if (isFetching) {
        return (
            <Preloader className={styles.preloader} />
        );
    }
    return <>
        <section className={styles.profileInfo}>
            <div className={styles.profileInfoBlockOne}>
                <div className={styles.items}>
                    <img src={photo ? photo : defaultAvatar} alt='avatar' className={styles.avatar} />
                </div>

                <div className={styles.items + ' ' + (lookingForAJob ? styles.on : styles.off)}>
                    {lookingForAJob ? "Находится в поиске работы" : "В работе не нуждается"}
                    {lookingForAJobDescription && <div className={styles.status}>
                        {lookingForAJobDescription}
                    </div>}
                </div>

                {(userId) &&
                    <div className={styles.items + ' ' + (followed ? styles.off : styles.on)}>
                        {followed ? 'Отписаться' : 'Подписаться'}
                    </div>}
            </div>
            <div className={styles.profileInfoBlockTwo}>
                <div className={styles.items}>
                    {name}
                    <div className={styles.status}>
                        {status}
                    </div>
                </div>
                <Contacts contacts={contacts} />
            </div>
        </section>
    </>
}

export default withAuthRedirect(Profile);