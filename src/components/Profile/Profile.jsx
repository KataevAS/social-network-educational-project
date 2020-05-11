import React, { useEffect } from 'react';
import defaultAvatar from '../../assets/img/defaultAvatar.png';
import styles from './Profile.module.css';
import Contacts from './Contacts';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, setUserPhoto } from '../../redux/actions/profileActions';
import { useParams } from 'react-router-dom';
import { profileAPI } from '../../api/api';
import ElementLoader from '../common/ElementLoader/ElementLoader';

const pathSvgInput = <>
    <path d='m287.396 216.317c23.845 23.845 23.845 62.505 0 
    86.35s-62.50523.845-86.35 0-23.845-62.505 0-86.35 62.505-23.845 86.35 0' />
    <path d="m427.397 91.581h-42.187l-30.544-61.059h-220.906l-30.515 
61.089-42.127.075c-33.585.06-60.925 27.429-60.954 61.029l-.164 244.145c0 33.675 27.384
 61.074 61.059 61.074h366.338c33.675 0 61.059-27.384 
61.059-61.059v-244.236c-.001-33.674-27.385-61.058-61.059-61.058zm-183.177 
290.029c-67.335 0-122.118-54.783-122.118-122.118s54.783-122.118 122.118-122.118 
122.118 54.783 122.118 122.118-54.783 122.118-122.118 122.118z" />
</>


const Profile = () => {
    //------Initial data------
    const {
        name,
        status,
        lookingForAJob,
        lookingForAJobDescription,
        followed,
        isFetching,
        photo,
        authId,
        contacts,
        photosLoader
    } = useSelector(state => {
        const p = state.profile;
        return {
            name: p.fullName,
            status: p.status,
            lookingForAJob: p.lookingForAJob,
            lookingForAJobDescription: p.lookingForAJobDescription,
            followed: p.followed,
            isFetching: p.isFetching,
            photo: p.photos.large,
            authId: state.auth.authUser.userId,
            contacts: p.contacts,
            photosLoader: p.photosLoader
        }
    });
    const userId = useParams().userId;
    const dispatch = useDispatch();

    //-------Local function--------
    const sendPhoto = (e) => {
        if (e.target.files[0]) {
            dispatch(setUserPhoto(e.target.files[0]));
        }
    }

    //-------Get User Profile--------
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

                <div className={styles.items + ' ' + styles.boxPhoto}>
                    {
                        photosLoader
                            ? <ElementLoader className={styles.photoLoader} />
                            : <img src={photo ? photo : defaultAvatar} alt='avatar' className={styles.avatar} />
                    }
                    {
                        !userId &&
                        <>
                            <label htmlFor="inputFile" className={styles.labelInput}>
                                <svg className={styles.inputAvaImg} viewBox="0 0 488.455 488.455">
                                    {pathSvgInput}
                                </svg>
                            </label>
                            <input id="inputFile" type="file" className={styles.inputFile} onChange={sendPhoto} />
                        </>
                    }
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