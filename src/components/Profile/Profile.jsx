import React from 'react';
import defaultAvatar from '../../assets/img/defaultAvatar.png';
import styles from './Profile.module.css';
import Contacts from './Contacts';
import Preloader from '../common/Preloader/Preloader';


const Profile = (props) => {

    let name = props.profile.fullName;
    let status = props.profile.status;
    let lookingForAJob = props.profile.lookingForAJob;
    let lookingForAJobDescription = props.profile.lookingForAJobDescription;
    let followed = props.profile.followed;

    if (props.isFetching) {
        return (
            <Preloader className={styles.preloader} />
        );
    }
    return (
        <section>
            <div className={styles.items}>
                <img src={props.profile.photos.large ? props.profile.photos.large : defaultAvatar} alt='avatar' className={styles.avatar} />
            </div>

            <div className={styles.items}>
                {name}
                <div className={styles.status}>
                    {status}
                </div>
            </div>

            <div className={styles.items + ' ' + (lookingForAJob ? styles.on : styles.off)}>
                {lookingForAJob ? "Находится в поиске работы" : "В работе не нуждается"}
                <div className={styles.status}>
                    {lookingForAJobDescription}
                </div>
            </div>

            {Object.values(props.profile.contacts).join("") && <Contacts contacts={props.profile.contacts} />}

            <div className={styles.items + ' ' + (followed ? styles.off : styles.on)}>
                {followed ? 'Отписаться' : 'Подписаться'}
            </div>

        </section>
    );
}

export default Profile;